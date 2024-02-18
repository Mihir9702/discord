import {
  Ctx,
  Int,
  Arg,
  Query,
  Resolver,
  Mutation,
  UseMiddleware,
} from "type-graphql";
import { Server } from "../entities/Server";
import { FriendInput, MyContext, relations } from "../types";
import { isAuth } from "../middleware/isAuth";
import {
  randomStringGenerator,
  randomNumberGenerator,
} from "../helpers/random";
import { User } from "../entities/User";
import { Channel } from "../entities/Channel";
import { ServerRole } from "../entities/ServerRole";
import { push } from "../helpers/array";

@Resolver()
export class ServerResolver {
  @Query(() => [Server])
  async servers(): Promise<Server[]> {
    return await Server.find({ relations: relations.server });
  }

  @Query(() => Server, { nullable: true })
  @UseMiddleware(isAuth)
  async server(@Arg("serverId") serverId: number): Promise<Server | null> {
    return await Server.findOne({
      where: { serverId },
      relations: [
        "users",
        "users.servers",
        "channels",
        "channels.users",
        "channels.messages",
        "channels.messages.user",
      ],
    });
  }

  @Mutation(() => Server)
  @UseMiddleware(isAuth)
  async createServer(
    @Arg("name") name: string,
    @Ctx() { req }: MyContext
  ): Promise<Server> {
    const link = randomStringGenerator(6);
    const serverId = randomNumberGenerator(6);

    const findLink = await Server.findOne({
      where: { link },
      relations: relations.server,
    });
    if (findLink) throw new Error("create server - link generation failed");

    const uid = await User.findOne({
      where: { id: req.session.idx },
      relations: relations.user,
    });
    if (!uid) throw new Error("create server - no user");

    const id = randomNumberGenerator(15).toString();
    const intro = await Channel.create({
      name: "intro",
      users: [{ ...uid }],
      channelId: id,
    }).save();

    const s = await Server.create({
      name,
      link,
      channels: [intro],
      serverId,
      users: [{ ...uid }],
    }).save();

    if (!uid.servers) {
      uid.servers = [s];
    } else {
      uid.servers.push(s);
    }

    if (!uid.channels) {
      uid.channels = [intro];
    } else {
      uid.channels.push(intro);
    }

    const owner = new ServerRole();
    owner.serverId = serverId;
    owner.role = "owner";

    uid.roles = push(uid.roles, owner);

    await User.save(uid);
    return s;
  }

  @Mutation(() => Server) // todo ** this requires serverRole
  @UseMiddleware(isAuth)
  async updateServer(
    @Ctx() { req }: MyContext,
    @Arg("serverId", () => Int) id: number,
    @Arg("name", () => String) name: string
  ): Promise<Server> {
    const s = await Server.findOne({
      where: { id },
      relations: relations.server,
    });
    if (!s) throw new Error("no server");

    if (typeof name !== "undefined") {
      s.name = name;
      await Server.save(s);
    }

    return s;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteServer(
    @Arg("id") id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const u = await User.findOne({
      where: { id: req.session.idx },
      relations: ["servers", "servers.users"],
    });
    if (!u) return false;

    const s = await Server.findOne({
      where: { id }, // this might be serverId
      relations: relations.server,
    });
    if (!s) return false;

    await Server.remove(s);
    return true;
  }
}
