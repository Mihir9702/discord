import {
  Arg,
  Ctx,
  Query,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MessagesResponse, MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import { randomNumberGenerator } from "../helpers/random";
import { MessageInput } from "../types";
import { check } from "../helpers/array";
import { validateMessage } from "../helpers/validate";
import { canManage, channelAudience, channelFor } from "../helpers/access";
import { emitTo } from "../socket";

@Resolver()
export class MessageResolver {
  // a message in a channel the signed in user can see
  async find(req: MyContext["req"], msgId: string) {
    const message = await Message.findOne({
      where: { msgId },
      relations: ["user", "channel"],
    });

    const { m } = check({ message });

    if (!m.channel) throw new Error("Message not found");

    // also makes sure the user can see the channel
    m.channel = await channelFor(req.session.idx, m.channel.channelId);

    return m;
  }

  @Query(() => Message)
  @UseMiddleware(isAuth)
  async message(
    @Arg("msgId") msgId: string,
    @Ctx() { req }: MyContext
  ): Promise<Message> {
    return await this.find(req, msgId);
  }

  @Query(() => MessagesResponse)
  @UseMiddleware(isAuth)
  async messages(
    @Ctx() { req }: MyContext,
    @Arg("channelId") channelId: string
  ): Promise<MessagesResponse | null> {
    const channel = await channelFor(req.session.idx, channelId, ["users"]);

    const messages = await Message.find({
      where: { channel: { id: channel.id } },
      relations: ["user"],
      order: { id: "ASC" },
    });

    if (channel.ptChat) {
      const friend = channel.users?.find((u) => u.id !== req.session.idx);

      return { channel, messages, friend: friend || null };
    }

    return { channel, messages };
  }

  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  async sendMessage(
    @Arg("params") params: MessageInput,
    @Ctx() { req }: MyContext
  ): Promise<Message> {
    const channel = await channelFor(req.session.idx, params.channelId);
    const user = await User.findOne({ where: { id: req.session.idx } });

    const { u, c } = check({ user, channel });

    const msg = (params.msg || "").trim();
    const invalid = validateMessage(msg);
    if (invalid) throw new Error(invalid);

    // no dms while either side has the other blocked
    if (c.ptChat) {
      const users = await User.find({
        where: { channels: { id: c.id } },
        relations: ["blocked"],
      });
      const blocked = users.some((a) =>
        a.blocked?.some(
          (b) => b.id !== a.id && users.some((x) => x.id === b.id)
        )
      );
      if (blocked) throw new Error("You can't send messages to this user");
    }

    const message = await Message.create({
      msg,
      msgId: randomNumberGenerator(10).toString(),
      user: u,
      channel: c,
    }).save();

    emitTo(await channelAudience(c), "message", { channelId: c.channelId });

    return message;
  }

  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  async updateMessage(
    @Arg("msgId", () => String) msgId: string,
    @Arg("content", () => String) content: string,
    @Ctx() { req }: MyContext
  ): Promise<Message> {
    const m = await this.find(req, msgId);

    if (m.user?.id !== req.session.idx) {
      throw new Error("You can only edit your own messages");
    }

    const msg = (content || "").trim();
    const invalid = validateMessage(msg);
    if (invalid) throw new Error(invalid);

    if (msg !== m.msg) {
      m.msg = msg;
      m.edited = true;
      await Message.update(m.id, { msg, edited: true });

      emitTo(await channelAudience(m.channel), "message", {
        channelId: m.channel.channelId,
      });
    }

    return m;
  }

  // your own messages, or anyone's if you manage the server
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteMessage(
    @Arg("msgId", () => String) msgId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const m = await this.find(req, msgId);
    const { u } = check({
      user: await User.findOne({ where: { id: req.session.idx } }),
    });

    const mine = m.user?.id === u.id;
    const mod = !!m.channel.server && canManage(u, m.channel.server.serverId);

    if (!mine && !mod) throw new Error("You can't delete this message");

    await Message.delete(m.id);

    emitTo(await channelAudience(m.channel), "message", {
      channelId: m.channel.channelId,
    });

    return true;
  }
}
