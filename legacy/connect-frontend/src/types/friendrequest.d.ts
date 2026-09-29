export declare type FriendRequestStatus = "incoming" | "outgoing";

export declare type FriendRequest = {
  nameId: string;
  userId: number;
  status: FriendRequestStatus;
};
