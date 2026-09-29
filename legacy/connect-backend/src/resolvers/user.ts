import {
  Arg,
  Ctx,
  Query,
  Resolver,
  Mutation,
  UseMiddleware,
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
import { FriendRequest } from "../entities/FriendRequest";
import { Channel } from "../entities/Channel";
import { check, filter, push, find, role, checkCopy } from "../helpers/array";
import { Input, FriendInput } from "../types";
import { Server } from "../entities/Server";
import { __prod__ } from "../constants";
import { validatePassword, validateUsername } from "../helpers/validate";

@Resolver()
export class UserResolver {
  @UseMiddleware(isAuth)
  async find(id?: number, relations?: string[]) {
    return await User.findOne({
      where: { id },
      relations: relations,
    });
  }

  @UseMiddleware(isAuth)
  async friend({ nameId, userId }: any, relations?: string[]) {
    return await User.findOne({
      where: { nameId, userId },
      relations: relations,
    });
  }

  @UseMiddleware(isAuth)
  async server(id: number, relations?: string[]) {
    return await Server.findOne({
      where: { serverId: id },
      relations: relations,
    });
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
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
    return await this.find(req.session.idx, [
      "servers",
      "servers.channels",
    ]).then((u) => (u && u.servers) || null);
  }

  @Query(() => [User], { nullable: true })
  @UseMiddleware(isAuth)
  async serverRole(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number
  ): Promise<User[] | null> {
    const u = await this.find(req.session.idx, ["servers", "roles"]);
    if (!u || !u.roles) throw new Error("userRole - no user");

    return role(u.roles, serverId);
  }

  @Mutation(() => User)
  async signup(
    @Arg("params") params: Input,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (
      await User.findOne({
        where: { username: params.username },
      })
    ) {
      throw new Error("Username already taken");
    }

    if (__prod__) {
      validateUsername(params.username);
      validatePassword(params.password);
    }

    const config: Config = {
      dictionaries: [adjectives, colors, animals, countries],
      length: 1,
    };

    const user = await User.create({
      username: params.username.toLowerCase(),
      password: await hash(params.password, await genSalt(10)),
      userId: randomNumberGenerator(4),
      nameId: uniqueNamesGenerator(config),
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
    if (!params.username) throw new Error("Username not provided");
    if (!params.password) throw new Error("Password not provided");

    const user = await User.findOne({
      where: { username: params.username },
    });

    if (!user) throw new Error("User not found");

    const valid = await compare(params.password, user.password);

    if (!valid) throw new Error("Invalid username or password");

    req.session.idx = user.id;

    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Ctx() { req }: MyContext,
    @Arg("params") params: UpdateUserInput
  ): Promise<User> {
    const u = await this.find(req.session.idx);
    if (!u) throw new Error("update user - no user");

    if (params.username) u.username = params.username;
    if (params.nameId) {
      u.nameId = params.nameId;
      u.userId = randomNumberGenerator(4);
    }

    // todo update icon
    if (params.status) u.status = params.status;

    return await User.save(u);
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updatePass(
    @Ctx() { req }: MyContext,
    @Arg("params") params: UpdatePassInput
  ): Promise<User> {
    const u = await this.find(req.session.idx);

    if (!u) throw new Error("update pass - no user");

    const valid = await compare(params.currPass, u.password);

    if (!valid) throw new Error("update pass - invalid password");

    const password = await hash(params.newPass, await genSalt(10));

    u.password = password;

    return await User.save(u);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(@Ctx() { req }: MyContext): Promise<boolean> {
    const user = await this.find(req.session.idx);

    if (!user) throw new Error("User not found");

    try {
      await User.remove(user);
      return true;
    } catch (ex) {
      throw new Error("deleteUser - Failed to delete user.");
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async logout(@Ctx() { req }: MyContext): Promise<boolean> {
    return req.session.destroy((err) => (err ? err : true)) ? true : false;
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async sendFriendRequest(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const relations = ["friends", "blocked", "channels", "channels.users"];

    const user = await this.find(req.session.idx, relations);
    const friend = await this.friend(params, relations);

    const { u, f } = check({ user, friend });

    checkCopy(u.friendRequests, f);
    checkCopy(f.friendRequests, u);

    const ufrq = new FriendRequest();
    ufrq.nameId = f.nameId;
    ufrq.userId = f.userId;
    ufrq.iconId = f.iconId;
    ufrq.status = "outgoing";

    const frfrq = new FriendRequest();
    frfrq.nameId = u.nameId;
    frfrq.userId = u.userId;
    frfrq.iconId = u.iconId;
    frfrq.status = "incoming";

    u.friendRequests = push(u.friendRequests, ufrq);
    f.friendRequests = push(f.friendRequests, frfrq);

    try {
      await Promise.all([User.save(u), User.save(f)]);
      return u;
    } catch (ex) {
      throw new Error("sendFriendRequest - Failed to save changes.");
    }
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async acceptFriendRequest(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const relations = ["friends", "blocked", "channels", "channels.users"];

    const user = await this.find(req.session.idx, relations);
    const friend = await this.friend(params, relations);

    const { u, f } = check({ user, friend });

    if (find(u.blocked!, f.id) || find(f.blocked!, u.id)) {
      throw new Error("acceptFriendRequest - blocked");
    }

    if (!u.friendRequests || !f.friendRequests) {
      throw new Error("acceptFriendRequest - No friend requests available.");
    }

    const id = randomNumberGenerator(15).toString();
    const ptChat = await Channel.create({
      name: id,
      ptChat: true,
      users: [{ ...u }, { ...f }],
      channelId: id,
    }).save();

    if (!u.channels) {
      u.channels = [ptChat];
    } else {
      u.channels.push(ptChat);
    }

    if (!f.channels) {
      f.channels = [ptChat];
    } else {
      f.channels.push(ptChat);
    }

    checkCopy(u.friends, f);
    checkCopy(f.friends, u);

    u.friends = push(u.friends, f);
    f.friends = push(f.friends, u);

    u.friendRequests = filter(u.friendRequests, f);
    f.friendRequests = filter(f.friendRequests, u);

    try {
      await Promise.all([User.save(u), User.save(f)]);
      return u;
    } catch (ex) {
      throw new Error("acceptFriendRequest - Failed to save changes.");
    }
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async declineFriendRequest(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await this.find(req.session.idx, ["friends", "blocked"]);
    const friend = await this.friend(params, ["friends", "blocked"]);

    const { u, f } = check({ user, friend });

    if (find(u.blocked!, f.id) || find(f.blocked!, u.id)) {
      throw new Error("declineFriendRequest - blocked");
    }

    if (!u.friendRequests || !f.friendRequests) {
      throw new Error("declineFriendRequest - No friend requests available.");
    }

    u.friendRequests = filter(u.friendRequests, f);
    f.friendRequests = filter(f.friendRequests, u);

    try {
      await Promise.all([User.save(u), User.save(f)]);
      return u;
    } catch (ex) {
      throw new Error("declineFriendRequest - Failed to save changes.");
    }
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async cancelFriendRequest(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await this.find(req.session.idx, ["friends", "blocked"]);
    const friend = await this.friend(params, ["friends", "blocked"]);

    const { u, f } = check({ user, friend });

    if (find(u.blocked!, f.id) || find(f.blocked!, u.id)) {
      throw new Error("cancelFriendRequest - blocked");
    }

    if (!u.friendRequests || !f.friendRequests) {
      throw new Error("cancelFriendRequest - No friend requests available.");
    }

    u.friendRequests = filter(u.friendRequests, f);
    f.friendRequests = filter(f.friendRequests, u);

    try {
      await Promise.all([User.save(u), User.save(f)]);
      return u;
    } catch (ex) {
      throw new Error("cancelFriendRequest - Failed to save changes.");
    }
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async removeFriend(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await this.find(req.session.idx, ["friends", "blocked"]);
    const friend = await this.friend(params, ["friends", "blocked"]);

    const { u, f } = check({ user, friend });

    if (find(u.blocked!, f.id) || find(f.blocked!, u.id)) {
      throw new Error("removeFriend - blocked");
    }

    if (!u.friends || !f.friends) {
      throw new Error("removeFriend - No friends available.");
    }

    u.friends = filter(u.friends, f);
    f.friends = filter(f.friends, u);

    try {
      await Promise.all([User.save(u), User.save(f)]);
      return u;
    } catch (ex) {
      throw new Error("removeFriend - Failed to save changes.");
    }
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async block(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await this.find(req.session.idx, ["friends", "blocked"]);
    const friend = await this.friend(params, ["friends", "blocked"]);

    const { u, f } = check({ user, friend });

    u.blocked = push(u.blocked, f);

    u.friends = filter(u.friends!, f);
    f.friends = filter(f.friends!, u);

    try {
      Promise.all([User.save(u), User.save(f)]);
      return u;
    } catch (ex) {
      throw new Error("blockUser - Failed to save changes.");
    }
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async unblock(
    @Arg("params") params: FriendInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    const user = await this.find(req.session.idx, ["friends", "blocked"]);
    const friend = await this.friend(params, ["friends", "blocked"]);

    const { u, f } = check({ user, friend });

    if (!u.blocked) {
      throw new Error("unblockUser - No blocked users available.");
    }

    u.blocked = filter(u.blocked, f);

    return await User.save(u);
  }

  @Mutation(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async join(
    @Ctx() { req }: MyContext,
    @Arg("link") link: string
  ): Promise<User | null> {
    const s = await Server.findOne({
      where: { link },
      relations: ["users", "users.servers"],
    });

    if (!s) throw new Error("join - no server");

    if (find(s.users!, req.session.idx!))
      throw new Error("join - already in server");

    const user = await this.find(req.session.idx, ["servers", "servers.users"]);
    const { u } = check({ user });
    const r = role(u.roles!, s.serverId);

    if (!r) {
      const roles = { serverId: s.serverId, role: "member" };
      u.roles = push(u.roles, { ...roles });
    } else {
      throw new Error("join - already in server");
    }

    u.servers = push(u.servers, s);
    s.users = push(s.users, u);

    try {
      await Promise.all([User.save(u), Server.save(s)]);
      return u;
    } catch (ex) {
      throw new Error("join - Failed to save changes.");
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async leave(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number
  ): Promise<boolean> {
    const user = await this.find(req.session.idx, ["servers", "servers.users"]);
    const server = await this.server(serverId, ["users", "users.servers"]);

    const { u, s } = check({ user, server });

    if (!find(u.servers!, u.id) || !find(s.users!, u.id)) {
      throw new Error("leave - not in server");
    }

    if (role(u.roles!, serverId) === "owner") {
      try {
        u.servers = filter(u.servers!, s);
        await Promise.all([User.save(u), Server.remove(s)]);
        return true;
      } catch (ex) {
        throw new Error("leave - owner failed");
      }
    } else {
      try {
        u.servers = filter(u.servers!, s);
        s.users = filter(s.users!, u);
        await Promise.all([User.save(u), Server.save(s)]);
        return true;
      } catch (ex) {
        throw new Error("leave - member failed");
      }
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async kick(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number,
    @Arg("params") params: FriendInput
  ): Promise<boolean> {
    const user = await this.find(req.session.idx, ["servers", "servers.users"]);
    const friend = await this.friend(params, ["servers", "servers.users"]);

    const { u, f } = check({ user, friend });

    const s = await this.server(serverId, ["users", "users.servers"]);

    if (!find(u.servers!, u.id) || !find(f.servers!, f.id)) {
      throw new Error("kick - not in server");
    }

    const r = role(u.roles!, serverId);

    if (r === "owner" || r === "admin") {
      f.servers = filter(f.servers!, s);
    } else {
      throw new Error("kick - not admin");
    }

    try {
      await Promise.all([User.save(u), User.save(f)]);
      return true;
    } catch (ex) {
      throw new Error("kick - Failed to save changes.");
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async ban(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number,
    @Arg("params") params: FriendInput
  ): Promise<boolean> {
    const user = await this.find(req.session.idx, ["servers", "servers.users"]);
    const friend = await this.friend(params, ["servers", "servers.users"]);
    const { u, f } = check({ user, friend });

    const server = await this.server(serverId, ["users", "users.servers"]);
    const { s } = check({ server });

    find(u.servers!, u.id) && find(f.servers!, f.id);

    const r = role(u.roles!, serverId);

    if (r === "owner" || r === "admin") {
      f.servers = filter(f.servers!, s);
      u.blocked = push(u.blocked, f);
      s.banned = push(s.banned, f);
    }

    try {
      await Promise.all([User.save(u), User.save(f), Server.save(s)]);
      return true;
    } catch (ex) {
      throw new Error("ban - Failed to save changes.");
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async unban(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number,
    @Arg("params") params: FriendInput
  ): Promise<boolean> {
    const user = await this.find(req.session.idx, ["servers", "servers.users"]);
    const friend = await this.friend(params, ["servers", "servers.users"]);

    const { u, f } = check({ user, friend });

    const server = await this.server(serverId, ["users", "users.servers"]);
    const { s } = check({ server });

    if (!find(u.servers!, u.id) || !find(f.servers!, f.id)) {
      throw new Error("unban - not in server");
    }

    const r = role(u.roles!, serverId);

    if (r === "owner" || r === "admin") {
      s.banned = filter(s.banned!, f);
    } else {
      throw new Error("unban - not admin");
    }

    try {
      await Promise.all([User.save(u), User.save(f), Server.save(s)]);
      return true;
    } catch (ex) {
      throw new Error("unban - Failed to save changes.");
    }
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updateStatus(
    @Ctx() { req }: MyContext,
    @Arg("status") status: String
  ): Promise<User> {
    const user = await this.find(req.session.idx);
    const { u } = check({ user });

    u.status = status as UserStatus;

    return await User.save(u);
  }
}
