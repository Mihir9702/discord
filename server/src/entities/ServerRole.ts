import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class ServerRole {
  @Field(() => Int)
  serverId!: number;

  @Field(() => String)
  role!: "member" | "admin" | "owner";
}
