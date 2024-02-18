import { ChannelQuery, ServerQuery, UserQuery } from "./graphql";

export type User = UserQuery["user"];
export type Server = ServerQuery["server"];
export type Channel = ChannelQuery["channel"];
export type Message = MessageQuery["message"];
