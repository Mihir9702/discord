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
import { check, push } from "../helpers/array";

@Resolver()
export class ChannelResolver {
  @UseMiddleware(isAuth)
  async find(id?: number, relations?: string[]) {
    return await User.findOne({ where: { id }, relations: relations });
  }

  @UseMiddleware(isAuth)
  async findChannel(channelId: string, relations?: string[]) {
    return await Channel.findOne({
      where: { channelId },
      relations: relations,
    });
  }

  @UseMiddleware(isAuth)
  async findServer(serverId: number, relations?: string[]) {
    return await Server.findOne({ where: { serverId }, relations: relations });
  }

  @Query(() => Channel)
  @UseMiddleware(isAuth)
  async currentChannel(
    @Arg("channelId") channelId: string,
    @Ctx() { req }: MyContext
  ): Promise<Channel> {
    const channel = await this.findChannel(channelId, [
      "users",
      "users.channels",
      "server",
      "server.channels",
    ]);
    const { c } = check({ channel });

    console.log(c);
    return c;
  }

  @Query(() => Server)
  @UseMiddleware(isAuth)
  async channel(
    @Ctx() { req }: MyContext,
    @Arg("channelId") channelId: string
  ): Promise<Server | null> {
    const u = await User.findOne({
      where: { id: req.session.idx },
      relations: [
        "channels",
        "channels.users",
        "servers",
        "servers.channels.users",
      ],
    });

    if (!u) throw new Error("channel - no user found");

    const s = await Server.findOne({
      where: { channels: { channelId } },
      relations: [
        "channels",
        "channels.users",
        "channels.server",
        "channels.server.channels",
        "channels.messages",
        "channels.messages.user",
      ],
    });

    if (!s) throw new Error("server channels - no sid");

    const c = s.channels?.find((ch) => ch.channelId === channelId);

    if (!c) throw new Error("channel - no channel found");

    const check = c.users?.find((user) => user?.id === u.id);

    if (!check) throw new Error("channel - no vip");

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

  @Query(() => [Channel])
  @UseMiddleware(isAuth)
  async serverChannels(
    @Arg("channelId") channelId: string,
    @Ctx() { req }: MyContext
  ): Promise<Channel[] | undefined> {
    const user = await this.find(req.session.idx, ["channels"]);
    const channel = await this.findChannel(channelId, ["server"]);
    const { u, c } = check({ user, channel });

    const server = c.server;
    const { s } = check({ server });

    if (!u.channels?.includes(c)) {
      throw new Error("server channels - no access");
    }

    return s.channels;
  }

  @Query(() => [Channel])
  @UseMiddleware(isAuth)
  async partyChats(@Ctx() { req }: MyContext): Promise<Channel[] | undefined> {
    const relations = ["channels", "channels.users"];
    const user = await this.find(req.session.idx, relations);
    const { u } = check({ user });
    const ptChats = u.channels?.filter((c: Channel) => c.ptChat === true);

    return ptChats;
  }

  @Mutation(() => Channel)
  @UseMiddleware(isAuth)
  async createServerChannel(
    @Arg("name") name: string,
    @Arg("serverId") serverId: number,
    @Ctx() { req }: MyContext
  ): Promise<Channel> {
    const user = await this.find(req.session.idx, ["channels"]);
    const server = await this.findServer(serverId, ["channels", "users"]);

    const channelId = randomNumberGenerator(15).toString();
    const channel = await this.findChannel(channelId);

    if (channel) throw new Error("create server channel - channel exists");

    const { u, s } = check({ user, server });

    const info = { name, server: s, channelId, users: [{ ...u }] };

    return await Channel.create(info).save();
  }

  @Mutation(() => Channel)
  @UseMiddleware(isAuth)
  async updateChannel(
    @Arg("channelId") channelId: string,
    @Arg("name") name: string,
    @Ctx() { req }: MyContext
  ): Promise<Channel> {
    const user = await this.find(req.session.idx, ["channels"]);
    const channel = await this.findChannel(channelId, ["users"]);
    const { u, c } = check({ user, channel });

    if (!c.users.includes(u)) {
      throw new Error("update channel - no access");
    }

    c.name = name;

    return await Channel.save(c);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteChannel(
    @Arg("channelId") channelId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const user = await this.find(req.session.idx, ["channels"]);
    const channel = await this.findChannel(channelId, ["users"]);
    const { u, c } = check({ user, channel });

    if (!c.users.includes(u)) {
      throw new Error("delete channel - no vip");
    }

    try {
      await Channel.delete({ channelId });
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
