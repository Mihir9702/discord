import { UserFriendsQuery } from "src/graphql";

export declare type FriendRequestStatus = "incoming" | "outgoing";

export declare type FriendRequest = NonNullable<
  NonNullable<UserFriendsQuery["userFriends"]>["friendRequests"]
>[number];
