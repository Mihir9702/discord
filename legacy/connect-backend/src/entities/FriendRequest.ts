import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";

export declare type FriendRequestStatus = "incoming" | "outgoing";

@ObjectType()
export class FriendRequest {
  @Field()
  @Column({ type: "text" })
  nameId!: string;

  @Field()
  @Column()
  userId!: number;

  @Field()
  @Column({ type: "text" })
  iconId!: string;

  @Field()
  @Column({ type: "text" })
  status!: FriendRequestStatus;
}
