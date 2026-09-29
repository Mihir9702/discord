import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Field, InputType, ObjectType } from "type-graphql";
import { User, UserStatus } from "./entities/User";
import { Message } from "./entities/Message";
import { Channel } from "./entities/Channel";
import { Server } from "./entities/Server";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { idx?: number };
  };
  res: Response;
};

@InputType()
export class Input {
  @Field() username!: string;
  @Field() password!: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true }) username?: string;
  @Field({ nullable: true }) password?: string;
  @Field({ nullable: true }) nameId?: string;
  @Field({ nullable: true }) status?: UserStatus;
}

@InputType()
export class UpdatePassInput {
  @Field() currPass!: string;
  @Field() newPass!: string;
}

@InputType()
export class FriendInput {
  @Field() nameId!: string;
  @Field() userId!: number;
}

@InputType()
export class MessageInput {
  @Field() msg!: string;
  @Field() channelId!: string;
}

@ObjectType()
export class ChannelInfo {
  @Field({ nullable: true }) name?: string;
  @Field({ nullable: true }) desc?: string;
  @Field({ nullable: true }) ptChat?: boolean;
}

@ObjectType()
export class MessagesResponse {
  @Field(() => [Message]) messages!: Message[];
  @Field(() => Channel) channel!: Channel;
  @Field(() => User, { nullable: true }) friend?: User | null;
}

export const relations = {
  user: [
    "friends",
    "servers",
    "servers.channels",
    "servers.channels.messages",
    "servers.channels.messages.user",
    "servers.channels.messages.channel",
    "servers.channels.messages.channel.server",
    "messages",
    "messages.user",
    "channels",
    "channels.users",
    "channels.server",
    "channels.messages",
    "channels.messages.user",
  ],
  server: [
    "users",
    "users.servers",
    "users.channels",
    "channels",
    "channels.messages",
    "channels.messages.channel",
    "channels.messages.user",
  ],
  message: [
    "user",
    "channel",
    "channel.users",
    "channel.messages",
    "channel.messages.user",
    "channel.messages.user.messages",
  ],
  channel: [
    "server",
    "users",
    "users.servers",
    "users.messages",
    "users.messages.channel",
    "messages",
    "messages.user",
  ],
};

export type CheckArgs = {
  user?: User | null | undefined;
  friend?: User | null | undefined;
  server?: Server | null | undefined;
  channel?: Channel | null | undefined;
  message?: Message | null | undefined;
};

export type CheckReturn = {
  u: User;
  f: User;
  s: Server;
  c: Channel;
  m: Message;
};
