import { UserFriendsQuery } from "src/graphql";

type UserFriends = NonNullable<UserFriendsQuery["userFriends"]>;

export declare type Friend = NonNullable<UserFriends["friends"]>[number];
export declare type BlockedUser = NonNullable<UserFriends["blocked"]>[number];
