import {
  ChannelQuery,
  MessagesQuery,
  PartyChatsQuery,
  ServerQuery,
  UserQuery,
  UserServersQuery,
} from "src/graphql";

export type User = NonNullable<UserQuery["user"]>;
export type Server = NonNullable<ServerQuery["server"]>;
export type UserServer = NonNullable<UserServersQuery["userServers"]>[number];
export type Channel = ChannelQuery["channel"];
export type DmChannel = PartyChatsQuery["partyChats"][number];
export type Message = MessagesQuery["messages"]["messages"][number];
