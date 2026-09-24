import {
  Arg,
  Ctx,
  Query,
  Resolver,
  Mutation,
  UseMiddleware,
  FieldResolver,
  Root,
} from "type-graphql";
import { MyContext, UpdatePassInput, UpdateUserInput } from "../types";
import { hash, genSalt, compare } from "bcryptjs";
import { User, UserStatus } from "../entities/User";
import { randomColorGenerator, randomNumberGenerator } from "../helpers/random";
import {
  adjectives,
  colors,
  animals,
  countries,
  Config,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { isAuth } from "../middleware/isAuth";
import { devOnly } from "../middleware/devOnly";
import { FriendRequest, FriendRequestStatus } from "../entities/FriendRequest";
import { ServerRole } from "../entities/ServerRole";
import { check, filter, push, find, role, same } from "../helpers/array";
import { Input, FriendInput } from "../types";
import { Server } from "../entities/Server";
import { COOKIE } from "../constants";
import {
  inviteCode,
  validateColor,
  validateNameId,
  validatePassword,
  validateStatus,
  validateUsername,
} from "../helpers/validate";
import {
  addToServer,
  canManage,
  deleteChannels,
  deleteServer,
  dmChannel,
  getRole,
  isMember,
  memberIds,
  relation,
  removeFromServer,
  setRole,
} from "../helpers/access";
import { audience, emitTo, isOnline } from "../socket";

const config: Config = {
  dictionaries: [adjectives, colors, animals, countries],
  length: 1,
};

const normalize = (username: string) => (username || "").trim().toLowerCase();

function request(user: User, status: FriendRequestStatus): FriendRequest {
  const frq = new FriendRequest();
  frq.nameId = user.nameId;
  frq.userId = user.userId;
  frq.iconId = user.iconId;
  frq.status = status;
  return frq;
}

// a random 4 digit tag nobody else with this name has
async function freeUserId(nameId: string): Promise<number> {
  for (let i = 0; i < 20; i++) {
    const userId = randomNumberGenerator(4);
    if (!(await User.findOne({ where: { nameId, userId } }))) return userId;
  }
  throw new Error("That display name is too popular, try another one");
}

function destroySession({ req, res }: MyContext): Promise<boolean> {
  return new Promise((resolve) =>
    req.session.destroy((err) => {
      res.clearCookie(COOKIE);
      resolve(!err);
    })
  );
}

// the other side of every pending request keeps a copy of our tag + icon
async function syncFriendRequests(u: User, old: FriendInput, remove = false) {
  for (const frq of u.friendRequests || []) {
    const other = await User.findOne({
      where: { nameId: frq.nameId, userId: frq.userId },
    });
    if (!other) continue;

    const friendRequests = remove
      ? filter(other.friendRequests, old)
      : (other.friendRequests || []).map((r) =>
          same(r, old)
            ? { ...r, nameId: u.nameId, userId: u.userId, iconId: u.iconId }
            : r
        );

    await User.update(other.id, { friendRequests });
  }
}

@Resolver(() => User)
export class UserFieldResolver {
  // your chosen status while connected, offline otherwise (you always see your own)
  @FieldResolver(() => String)
  status(@Root() user: User, @Ctx() { req }: MyContext): string {
    if (user.id === req.session.idx) return user.status;
    return isOnline(user.id) ? user.status : "offline";
  }
}

@Resolver()
export class UserResolver {
  // lookups - an undefined id would make typeorm return the first row, so bail early
  async find(id?: number, relations?: string[]) {
    if (!id) return null;
    return await User.findOne({
      where: { id },
      relations: relations,
    });
  }

  async friend({ nameId, userId }: FriendInput, relations?: string[]) {
    if (!nameId || !userId) return null;
    return await User.findOne({
      where: { nameId, userId },
      relations: relations,
    });
  }

  async server(id: number, relations?: string[]) {
    if (!id) return null;
    return await Server.findOne({
      where: { serverId: id },
      relations: relations,
    });
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, devOnly)
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  async user(@Ctx() { req }: MyContext): Promise<User | null> {
    return await this.find(req.session.idx);
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async userFriends(@Ctx() { req }: MyContext): Promise<User | null> {
    return await this.find(req.session.idx, ["friends", "blocked"]);
  }

  @Query(() => [Server], { nullable: true })
  @UseMiddleware(isAuth)
  async userServers(@Ctx() { req }: MyContext): Promise<Server[] | null> {
    const u = await this.find(req.session.idx, [
      "servers",
      "servers.channels",
    ]);
    if (!u || !u.servers) return null;

    u.servers.sort((a, b) => a.id - b.id);
    u.servers.forEach((s) => s.channels?.sort((a, b) => a.id - b.id));
    return u.servers;
  }

  @Query(() => ServerRole, { nullable: true })
  @UseMiddleware(isAuth)
  async serverRole(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number
  ): Promise<ServerRole | null> {
    const { u } = check({ user: await this.find(req.session.idx) });

    return role(u.roles, serverId) || null;
  }

  @Mutation(() => User)
  async signup(
    @Arg("params") params: Input,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const username = normalize(params.username);

    const invalid =
      validateUsername(username) || validatePassword(params.password);
    if (invalid) throw new Error(invalid);

    if (await User.findOne({ where: { username } })) {
      throw new Error("Username already taken");
    }

    const nameId = uniqueNamesGenerator(config);

    const user = await User.create({
      username,
      password: await hash(params.password, await genSalt(10)),
      userId: await freeUserId(nameId),
      nameId,
      iconId: randomColorGenerator(),
    }).save();

    req.session.idx = user.id;

    return user;
  }

  @Mutation(() => User)
  async login(
    @Arg("params") params: Input,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const username = normalize(params.username);

    if (!username) throw new Error("Username not provided");
    if (!params.password) throw new Error("Password not provided");

    const user = await User.findOne({
      where: { username },
    });

    const valid = user && (await compare(params.password, user.password));

    if (!user || !valid) throw new Error("Invalid username or password");

    req.session.idx = user.id;

    return user;
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updateUser(
    @Ctx() { req }: MyContext,
    @Arg("params") params: UpdateUserInput
  ): Promise<User> {
    const { u } = check({ user: await this.find(req.session.idx) });
    const old = { nameId: u.nameId, userId: u.userId };

    if (params.username) {
      const username = normalize(params.username);
      const invalid = validateUsername(username);
      if (invalid) throw new Error(invalid);

      if (username !== u.username) {
        if (await User.findOne({ where: { username } })) {
          throw new Error("Username already taken");
        }
        u.username = username;
      }
    }

    if (params.nameId) {
      const nameId = params.nameId.trim();
      const invalid = validateNameId(nameId);
      if (invalid) throw new Error(invalid);

      if (nameId !== u.nameId) {
        u.userId = await freeUserId(nameId);
        u.nameId = nameId;
      }
    }

    if (params.iconId) {
      const invalid = validateColor(params.iconId);
      if (invalid) throw new Error(invalid);
      u.iconId = params.iconId;
    }

    if (params.status) {
      const invalid = validateStatus(params.status);
      if (invalid) throw new Error(invalid);
      u.status = params.status;
    }

    await User.update(u.id, {
      username: u.username,
      nameId: u.nameId,
      userId: u.userId,
      iconId: u.iconId,
      status: u.status,
    });

    if (!same(u, old) || params.iconId) await syncFriendRequests(u, old);

    // names, icons and statuses show up everywhere - let everyone refetch
    emitTo(await audience(u.id), "presence", { id: u.id });
    emitTo([u.id], "account");

    return u;
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updatePass(
    @Ctx() { req }: MyContext,
    @Arg("params") params: UpdatePassInput
  ): Promise<User> {
    const { u } = check({ user: await this.find(req.session.idx) });

    const valid = await compare(params.currPass, u.password);

    if (!valid) throw new Error("Current password is incorrect");

    const invalid = validatePassword(params.newPass);
    if (invalid) throw new Error(invalid);

    u.password = await hash(params.newPass, await genSalt(10));

    await User.update(u.id, { password: u.password });

    return u;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(
    @Ctx() ctx: MyContext,
    @Arg("password") password: string
  ): Promise<boolean> {
    const { u } = check({
      user: await this.find(ctx.req.session.idx, ["channels"]),
    });

    if (!(await compare(password, u.password))) {
      throw new Error("Incorrect password");
    }

    const notify = await audience(u.id);

    // servers they own go with them
    for (const r of u.roles || []) {
      if (r.role !== "owner") continue;
      const s = await this.server(r.serverId);
      if (s) await deleteServer(s);
    }

    // and so do their dms
    await deleteChannels(
      (u.channels || []).filter((c) => c.ptChat).map((c) => c.id)
    );

    // pending requests on the other side
    await syncFriendRequests(u, u, true);

    // messages, friends, blocks and memberships cascade
    await User.delete(u.id);

    await destroySession(ctx);

    emitTo(notify, "friends");
    emitTo(notify, "presence", { id: u.id });

    return true;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<boolean> {
    return await destroySession(ctx);
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async sendFriendRequest(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const relations = ["friends", "blocked"];

    const user = await this.find(req.session.idx, relations);
    const friend = await this.friend(params, relations);

    const { u, f } = check({ user, friend });

    if (u.id === f.id) throw new Error("You can't add yourself as a friend");

    if (find(u.blocked, f.id)) {
      throw new Error("You blocked this user - unblock them first");
    }
    if (find(f.blocked, u.id)) {
      throw new Error("Unable to send a friend request to this user");
    }
    if (find(u.friends, f.id)) {
      throw new Error("You're already friends with this user");
    }

    const pending = (u.friendRequests || []).find((r) => same(r, f));

    if (pending && pending.status === "outgoing") {
      throw new Error("Friend request already sent");
    }

    // they already asked - just accept it
    if (pending && pending.status === "incoming") {
      return await this.accept(u, f);
    }

    u.friendRequests = push(filter(u.friendRequests, f), request(f, "outgoing"));
    f.friendRequests = push(filter(f.friendRequests, u), request(u, "incoming"));

    await Promise.all([
      User.update(u.id, { friendRequests: u.friendRequests }),
      User.update(f.id, { friendRequests: f.friendRequests }),
    ]);

    emitTo([u.id, f.id], "friends");

    return u;
  }

  async accept(u: User, f: User): Promise<User> {
    if (find(u.blocked, f.id) || find(f.blocked, u.id)) {
      throw new Error("Unable to accept this friend request");
    }

    const incoming = (u.friendRequests || []).find(
      (r) => same(r, f) && r.status === "incoming"
    );
    if (!incoming) throw new Error("No friend request from this user");

    await Promise.all([
      User.update(u.id, { friendRequests: filter(u.friendRequests, f) }),
      User.update(f.id, { friendRequests: filter(f.friendRequests, u) }),
    ]);

    if (!find(u.friends, f.id)) await relation(User, "friends").of(u.id).add(f.id);
    if (!find(f.friends, u.id)) await relation(User, "friends").of(f.id).add(u.id);

    await dmChannel(u, f);

    emitTo([u.id, f.id], "friends");

    return (await this.find(u.id, ["friends", "channels", "channels.users"]))!;
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async acceptFriendRequest(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const relations = ["friends", "blocked"];

    const user = await this.find(req.session.idx, relations);
    const friend = await this.friend(params, relations);

    const { u, f } = check({ user, friend });

    return await this.accept(u, f);
  }

  // incoming request -> decline, outgoing request -> cancel
  async dropRequest(
    req: MyContext["req"],
    params: FriendInput,
    status: FriendRequestStatus
  ): Promise<User> {
    const user = await this.find(req.session.idx);
    const friend = await this.friend(params);

    const { u, f } = check({ user, friend });

    const pending = (u.friendRequests || []).find(
      (r) => same(r, f) && r.status === status
    );
    if (!pending) throw new Error("Friend request not found");

    u.friendRequests = filter(u.friendRequests, f);

    await Promise.all([
      User.update(u.id, { friendRequests: u.friendRequests }),
      User.update(f.id, { friendRequests: filter(f.friendRequests, u) }),
    ]);

    emitTo([u.id, f.id], "friends");

    return u;
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async declineFriendRequest(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    return await this.dropRequest(req, params, "incoming");
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async cancelFriendRequest(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    return await this.dropRequest(req, params, "outgoing");
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async removeFriend(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await this.find(req.session.idx, ["friends"]);
    const friend = await this.friend(params, ["friends"]);

    const { u, f } = check({ user, friend });

    if (!find(u.friends, f.id)) {
      throw new Error("You're not friends with this user");
    }

    await relation(User, "friends").of(u.id).remove(f.id);
    if (find(f.friends, u.id)) {
      await relation(User, "friends").of(f.id).remove(u.id);
    }

    emitTo([u.id, f.id], "friends");

    return u;
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async block(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const relations = ["friends", "blocked"];

    const user = await this.find(req.session.idx, relations);
    const friend = await this.friend(params, relations);

    const { u, f } = check({ user, friend });

    if (u.id === f.id) throw new Error("You can't block yourself");

    if (!find(u.blocked, f.id)) {
      await relation(User, "blocked").of(u.id).add(f.id);
    }

    if (find(u.friends, f.id)) {
      await relation(User, "friends").of(u.id).remove(f.id);
    }
    if (find(f.friends, u.id)) {
      await relation(User, "friends").of(f.id).remove(u.id);
    }

    // pending requests either way are dropped too
    await Promise.all([
      User.update(u.id, { friendRequests: filter(u.friendRequests, f) }),
      User.update(f.id, { friendRequests: filter(f.friendRequests, u) }),
    ]);

    emitTo([u.id, f.id], "friends");

    return u;
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async unblock(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await this.find(req.session.idx, ["blocked"]);
    const friend = await this.friend(params);

    const { u, f } = check({ user, friend });

    if (!find(u.blocked, f.id)) throw new Error("This user isn't blocked");

    await relation(User, "blocked").of(u.id).remove(f.id);

    emitTo([u.id], "friends");

    return u;
  }

  @Mutation(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async join(
    @Ctx() { req }: MyContext,
    @Arg("link") link: string
  ): Promise<User | null> {
    const s = await Server.findOne({
      where: { link: inviteCode(link) },
    });

    if (!s) throw new Error("Invite is invalid or has expired");

    const { u } = check({ user: await this.find(req.session.idx) });

    if ((s.banned || []).some((b) => b.id === u.id)) {
      throw new Error("You're banned from this server");
    }

    if (await isMember(u.id, s.id)) {
      throw new Error("You're already in this server");
    }

    await addToServer(u, s);

    emitTo(await memberIds(s.id), "server", { serverId: s.serverId });

    return await this.find(u.id, ["servers"]);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async leave(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number
  ): Promise<boolean> {
    const user = await this.find(req.session.idx);
    const server = await this.server(serverId);

    const { u, s } = check({ user, server });

    if (!(await isMember(u.id, s.id))) {
      throw new Error("You're not in this server");
    }

    // the owner leaving takes the server with them
    if (getRole(u, s.serverId) === "owner") {
      await deleteServer(s);
      return true;
    }

    await removeFromServer(u, s);

    emitTo([u.id], "server:removed", { serverId: s.serverId });
    emitTo(await memberIds(s.id), "server", { serverId: s.serverId });

    return true;
  }

  // owners can moderate anyone, admins only regular members
  async moderate(req: MyContext["req"], serverId: number, params: FriendInput) {
    const user = await this.find(req.session.idx);
    const friend = await this.friend(params);
    const server = await this.server(serverId);

    const { u, f, s } = check({ user, friend, server });

    if (!canManage(u, s.serverId)) {
      throw new Error("You don't have permission to do that");
    }

    const target = getRole(f, s.serverId);

    if (
      u.id === f.id ||
      target === "owner" ||
      (target === "admin" && getRole(u, s.serverId) !== "owner")
    ) {
      throw new Error("You can't do that to this member");
    }

    return { u, f, s };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async kick(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number,
    @Arg("params") params: FriendInput
  ): Promise<boolean> {
    const { f, s } = await this.moderate(req, serverId, params);

    if (!(await isMember(f.id, s.id))) {
      throw new Error("That user isn't in this server");
    }

    await removeFromServer(f, s);

    emitTo([f.id], "server:removed", { serverId: s.serverId });
    emitTo(await memberIds(s.id), "server", { serverId: s.serverId });

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async ban(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number,
    @Arg("params") params: FriendInput
  ): Promise<boolean> {
    const { f, s } = await this.moderate(req, serverId, params);

    if (await isMember(f.id, s.id)) {
      await removeFromServer(f, s);
      emitTo([f.id], "server:removed", { serverId: s.serverId });
    }

    if (!(s.banned || []).some((b) => b.id === f.id)) {
      const { id, nameId, userId, iconId } = f;
      s.banned = push(s.banned, { id, nameId, userId, iconId });
      await Server.update(s.id, { banned: s.banned });
    }

    emitTo(await memberIds(s.id), "server", { serverId: s.serverId });

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async unban(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number,
    @Arg("params") params: FriendInput
  ): Promise<boolean> {
    const user = await this.find(req.session.idx);
    const friend = await this.friend(params);
    const server = await this.server(serverId);

    const { u, f, s } = check({ user, friend, server });

    if (!canManage(u, s.serverId)) {
      throw new Error("You don't have permission to do that");
    }

    s.banned = (s.banned || []).filter((b) => b.id !== f.id);
    await Server.update(s.id, { banned: s.banned });

    emitTo(await memberIds(s.id), "server", { serverId: s.serverId });

    return true;
  }

  // owner only - promote to admin or demote back to member
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateRole(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number,
    @Arg("params") params: FriendInput,
    @Arg("role") newRole: string
  ): Promise<boolean> {
    const user = await this.find(req.session.idx);
    const friend = await this.friend(params);
    const server = await this.server(serverId);

    const { u, f, s } = check({ user, friend, server });

    if (getRole(u, s.serverId) !== "owner") {
      throw new Error("Only the server owner can change roles");
    }
    if (newRole !== "admin" && newRole !== "member") {
      throw new Error("Invalid role");
    }
    if (u.id === f.id || !(await isMember(f.id, s.id))) {
      throw new Error("You can't change this member's role");
    }

    await setRole(f, s.serverId, newRole);

    emitTo(await memberIds(s.id), "server", { serverId: s.serverId });

    return true;
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updateStatus(
    @Ctx() { req }: MyContext,
    @Arg("status") status: string
  ): Promise<User> {
    const { u } = check({ user: await this.find(req.session.idx) });

    const invalid = validateStatus(status);
    if (invalid) throw new Error(invalid);

    u.status = status as UserStatus;

    await User.update(u.id, { status: u.status });

    emitTo(await audience(u.id), "presence", { id: u.id });
    emitTo([u.id], "account");

    return u;
  }
}
