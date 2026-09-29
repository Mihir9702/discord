import {
  Arg,
  Ctx,
  Query,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { MessagesResponse, MyContext, relations } from "../types";
import { isAuth } from "../middleware/isAuth";
import { Message } from "../entities/Message";
import { User } from "../entities/User";
import { Channel } from "../entities/Channel";
import { randomNumberGenerator } from "../helpers/random";
import { MessageInput } from "../types";
import { check, push } from "../helpers/array";
import { createServer } from "http";
import { Server } from "socket.io";

// const server = createServer();
// const io = new Server(server);

@Resolver()
export class MessageResolver {
  @Query(() => Message)
  @UseMiddleware(isAuth)
  async message(@Arg("msgId") msgId: string): Promise<Message | null> {
    return await Message.findOne({
      where: { msgId },
      relations: relations.message,
    });
  }

  @Query(() => MessagesResponse)
  @UseMiddleware(isAuth)
  async messages(
    @Ctx() { req }: MyContext,
    @Arg("channelId") channelId: string
  ): Promise<MessagesResponse | null> {
    const user = await User.findOne({
      where: { id: req.session.idx },
    });
    check({ user });
    const channel = await Channel.findOne({
      where: { channelId },
      relations: [
        "messages",
        "messages.user",
        "messages.channel",
        "users",
        "users.messages",
        "users.channels",
      ],
    });
    if (!channel) throw new Error("messages - no channel");

    const messages = channel.messages || [];

    if (channel.ptChat) {
      const friend = channel.users?.filter((u) => u.id !== user?.id);
      if (!friend) throw new Error("messages - no friend");

      return { channel, messages, friend: friend[0] };
    }

    return { channel, messages };
  }

  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  async sendMessage(
    @Arg("params") params: MessageInput,
    @Ctx() { req }: MyContext
  ): Promise<Message> {
    const u = await User.findOne({
      where: { id: req.session.idx },
      relations: ["messages", "messages.channel"],
    });

    if (!u) throw new Error("send msg - no user");

    const ch = await Channel.findOne({
      where: { channelId: params.channelId },
      relations: ["messages", "messages.channel"],
    });

    if (!ch) throw new Error("send msg - no channel");

    if (params.msg === "" || params.msg === " ")
      throw new Error("send msg - msg too short");
    if (params.msg.length > 2000) throw new Error("send msg - msg too long");

    const msgId = randomNumberGenerator(10).toString();
    const info = { ...params, user: u, msgId };
    const msg = await Message.create(info).save();

    ch.messages = push(ch.messages, msg);

    await Channel.save(ch);
    return msg;
  }

  @Query(() => Message)
  async updateMessage(
    @Arg("msgId", () => String) msgId: string,
    @Arg("content", () => String) content: string
  ): Promise<Message> {
    const msg = await Message.findOne({
      where: { msgId },
      relations: relations.message,
    });
    if (!msg) throw new Error("update msg - no msg");

    if (typeof content !== "undefined") {
      msg.msg = content;
      await Message.save(msg);
    }

    return msg;
  }

  @Query(() => Boolean)
  async deleteMessage(
    @Arg("msgId", () => String) msgId: string,
    @Arg("channelId", () => String) channelId: string
  ): Promise<boolean> {
    const msg = await Message.findOne({
      where: { msgId },
      relations: ["channel", "channel.msgs"],
    });
    if (!msg) throw new Error("delete msg - no msg");

    const ch = await Channel.findOne({
      where: { channelId },
      relations: ["messages", "messages.channel"],
    });

    if (!ch) throw new Error("delete msg - no channel");

    const idx = ch.messages?.findIndex((m) => m.msgId === msgId);
    if (!idx) throw new Error("delete msg - no msg in channel");

    await Message.remove(msg);
    return true;
  }
}
