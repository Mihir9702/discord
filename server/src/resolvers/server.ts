import {
  Ctx,
  Arg,
  Query,
  Resolver,
  Mutation,
  UseMiddleware,
  FieldResolver,
  Root,
} from "type-graphql";
import { Server } from "../entities/Server";
import { InviteInfo, MyContext, ServerMember, relations } from "../types";
import { isAuth } from "../middleware/isAuth";
import { devOnly } from "../middleware/devOnly";
import {
  randomStringGenerator,
  randomNumberGenerator,
} from "../helpers/random";
import { User } from "../entities/User";
import { Channel } from "../entities/Channel";
import { check } from "../helpers/array";
import {
  addToServer,
  canManage,
  deleteServer,
  getRole,
  memberIds,
  members as membersOf,
} from "../helpers/access";
import {
  inviteCode,
  validateIcon,
  validateServerName,
} from "../helpers/validate";
import { emitTo } from "../socket";

async function freeLink(): Promise<string> {
  for (let i = 0; i < 20; i++) {
    const link = randomStringGenerator(6);
    if (!(await Server.findOne({ where: { link } }))) return link;
  }
  throw new Error("create server - link generation failed");
}

async function freeServerId(): Promise<number> {
  for (let i = 0; i < 20; i++) {
    const serverId = randomNumberGenerator(6);
    if (!(await Server.findOne({ where: { serverId } }))) return serverId;
  }
  throw new Error("create server - id generation failed");
}

@Resolver(() => Server)
export class ServerResolver {
  // everyone in the server with their role in it (roles on users are private)
  @FieldResolver(() => [ServerMember])
  async members(@Root() s: Server): Promise<ServerMember[]> {
    const users = s.users || (await membersOf(s.id));
    return users.map((user) => ({
      user,
      role: getRole(user, s.serverId) || "member",
    }));
  }

  // the signed in user + a server they belong to
  async member(req: MyContext["req"], serverId: number) {
    const user = await User.findOne({ where: { id: req.session.idx } });
    const server = await Server.findOne({
      where: { serverId },
      relations: ["users", "channels"],
    });

    const { u, s } = check({ user, server });

    if (!s.users?.some((m) => m.id === u.id)) {
      throw new Error("Server not found");
    }

    s.channels?.sort((a, b) => a.id - b.id);

    return { u, s };
  }

  @Query(() => [Server])
  @UseMiddleware(isAuth, devOnly)
  async servers(): Promise<Server[]> {
    return await Server.find({ relations: relations.server });
  }

  @Query(() => Server, { nullable: true })
  @UseMiddleware(isAuth)
  async server(
    @Arg("serverId") serverId: number,
    @Ctx() { req }: MyContext
  ): Promise<Server | null> {
    const { s } = await this.member(req, serverId);
    s.users?.sort((a, b) => a.id - b.id);
    return s;
  }

  // what an invite link points to - works signed out too
  @Query(() => InviteInfo, { nullable: true })
  async invite(
    @Arg("link") link: string,
    @Ctx() { req }: MyContext
  ): Promise<InviteInfo | null> {
    const s = await Server.findOne({
      where: { link: inviteCode(link) },
      relations: ["users", "channels"],
    });

    if (!s) return null;

    const [first] = (s.channels || []).sort((a, b) => a.id - b.id);

    return {
      name: s.name,
      link: s.link,
      serverId: s.serverId,
      icon: s.icon,
      memberCount: s.users?.length || 0,
      joined: !!s.users?.some((u) => u.id === req.session.idx),
      channelId: first?.channelId,
    };
  }

  @Mutation(() => Server)
  @UseMiddleware(isAuth)
  async createServer(
    @Arg("name") name: string,
    @Ctx() { req }: MyContext
  ): Promise<Server> {
    const invalid = validateServerName(name.trim());
    if (invalid) throw new Error(invalid);

    const { u } = check({
      user: await User.findOne({ where: { id: req.session.idx } }),
    });

    const s = await Server.create({
      name: name.trim(),
      link: await freeLink(),
      serverId: await freeServerId(),
    }).save();

    const intro = await Channel.create({
      name: "intro",
      channelId: randomNumberGenerator(15).toString(),
      server: s,
    }).save();

    await addToServer(u, s, "owner");

    s.channels = [intro];
    return s;
  }

  @Mutation(() => Server)
  @UseMiddleware(isAuth)
  async updateServer(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("icon", { nullable: true }) icon?: string
  ): Promise<Server> {
    const { u, s } = await this.member(req, serverId);

    if (!canManage(u, s.serverId)) {
      throw new Error("You don't have permission to edit this server");
    }

    if (typeof name === "string") {
      const invalid = validateServerName(name.trim());
      if (invalid) throw new Error(invalid);
      s.name = name.trim();
    }

    if (typeof icon === "string") {
      const invalid = validateIcon(icon.trim());
      if (invalid) throw new Error(invalid);
      s.icon = icon.trim() || undefined;
    }

    await Server.update(s.id, {
      name: s.name,
      icon: s.icon ? s.icon : () => "NULL", // clearing needs a raw null
    });

    emitTo(await memberIds(s.id), "server", { serverId: s.serverId });

    return s;
  }

  // new invite link - the old one stops working
  @Mutation(() => Server)
  @UseMiddleware(isAuth)
  async refreshLink(
    @Ctx() { req }: MyContext,
    @Arg("serverId") serverId: number
  ): Promise<Server> {
    const { u, s } = await this.member(req, serverId);

    if (!canManage(u, s.serverId)) {
      throw new Error("You don't have permission to manage invites");
    }

    s.link = await freeLink();
    await Server.update(s.id, { link: s.link });

    emitTo(await memberIds(s.id), "server", { serverId: s.serverId });

    return s;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteServer(
    @Arg("serverId") serverId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const { u, s } = await this.member(req, serverId);

    if (getRole(u, s.serverId) !== "owner") {
      throw new Error("Only the server owner can delete it");
    }

    await deleteServer(s);

    return true;
  }
}
