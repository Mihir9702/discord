import {
  Arg,
  Ctx,
  Query,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { User } from "../entities/User";
import { Channel } from "../entities/Channel";
import { Server } from "../entities/Server";
import { randomNumberGenerator } from "../helpers/random";
import { check } from "../helpers/array";
import { channelName } from "../helpers/validate";
import {
  canManage,
  channelFor,
  isMember,
  memberIds,
  members,
} from "../helpers/access";
import { emitTo } from "../socket";

@Resolver()
export class ChannelResolver {
  async find(id?: number, relations?: string[]) {
    if (!id) return null;
    return await User.findOne({ where: { id }, relations: relations });
  }

  // a server channel the signed in user is allowed to manage
  async manageable(req: MyContext["req"], channelId: string) {
    const channel = await channelFor(req.session.idx, channelId);
    const user = await this.find(req.session.idx);

    const { u, c } = check({ user, channel });

    if (c.ptChat || !c.server || !canManage(u, c.server.serverId)) {
      throw new Error("You don't have permission to manage this channel");
    }

    return { u, c, s: c.server };
  }

  @Query(() => Channel)
  @UseMiddleware(isAuth)
  async currentChannel(
    @Arg("channelId") channelId: string,
    @Ctx() { req }: MyContext
  ): Promise<Channel> {
    const c = await channelFor(req.session.idx, channelId, ["users"]);

    // everyone in a server can see its channels
    if (!c.ptChat && c.server) c.users = await members(c.server.id);

    return c;
  }

  // the server a channel belongs to
  @Query(() => Server)
  @UseMiddleware(isAuth)
  async channel(
    @Ctx() { req }: MyContext,
    @Arg("channelId") channelId: string
  ): Promise<Server> {
    const c = await channelFor(req.session.idx, channelId);

    const s = c.server
      ? await Server.findOne({
          where: { id: c.server.id },
          relations: ["channels", "channels.server"],
        })
      : null;

    if (!s) throw new Error("Server not found");

    s.channels?.sort((a, b) => a.id - b.id);
    return s;
  }

  @Query(() => [Channel])
  @UseMiddleware(isAuth)
  async userChannels(
    @Ctx() { req }: MyContext
  ): Promise<Channel[] | undefined> {
    const user = await this.find(req.session.idx, ["channels"]);
    const { u } = check({ user });

    return u.channels;
  }

  // every channel in the same server as this one
  @Query(() => [Channel])
  @UseMiddleware(isAuth)
  async serverChannels(
    @Arg("channelId") channelId: string,
    @Ctx() { req }: MyContext
  ): Promise<Channel[]> {
    const c = await channelFor(req.session.idx, channelId);

    if (!c.server) return [];

    return await Channel.find({
      where: { server: { id: c.server.id } },
      relations: ["server"],
      order: { id: "ASC" },
    });
  }

  @Query(() => [Channel])
  @UseMiddleware(isAuth)
  async partyChats(@Ctx() { req }: MyContext): Promise<Channel[]> {
    return await Channel.createQueryBuilder("c")
      .innerJoin("c.users", "me", "me.id = :id", { id: req.session.idx })
      .leftJoinAndSelect("c.users", "users")
      .where("c.ptChat = true")
      .orderBy("c.id", "ASC")
      .getMany();
  }

  @Mutation(() => Channel)
  @UseMiddleware(isAuth)
  async createServerChannel(
    @Arg("name") name: string,
    @Arg("serverId") serverId: number,
    @Ctx() { req }: MyContext
  ): Promise<Channel> {
    const user = await this.find(req.session.idx);
    const server = await Server.findOne({ where: { serverId } });

    const { u, s } = check({ user, server });

    if (!(await isMember(u.id, s.id)) || !canManage(u, s.serverId)) {
      throw new Error("You don't have permission to create channels");
    }

    const clean = channelName(name);
    if (!clean) throw new Error("Channel name can't be empty");

    const channel = await Channel.create({
      name: clean,
      server: s,
      channelId: randomNumberGenerator(15).toString(),
    }).save();

    emitTo(await memberIds(s.id), "server", { serverId: s.serverId });

    return channel;
  }

  @Mutation(() => Channel)
  @UseMiddleware(isAuth)
  async updateChannel(
    @Arg("channelId") channelId: string,
    @Arg("name", { nullable: true }) name: string,
    @Arg("desc", { nullable: true }) desc: string,
    @Ctx() { req }: MyContext
  ): Promise<Channel> {
    const { c, s } = await this.manageable(req, channelId);

    if (typeof name === "string") {
      const clean = channelName(name);
      if (!clean) throw new Error("Channel name can't be empty");
      c.name = clean;
    }

    if (typeof desc === "string") {
      if (desc.length > 1024) throw new Error("Channel topic is too long");
      c.desc = desc.trim();
    }

    await Channel.update(c.id, { name: c.name, desc: c.desc });

    emitTo(await memberIds(s.id), "server", { serverId: s.serverId });

    return c;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteChannel(
    @Arg("channelId") channelId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const { c, s } = await this.manageable(req, channelId);

    const count = await Channel.count({ where: { server: { id: s.id } } });
    if (count <= 1) throw new Error("A server needs at least one channel");

    // messages cascade
    await Channel.delete(c.id);

    emitTo(await memberIds(s.id), "server", { serverId: s.serverId });

    return true;
  }
}
