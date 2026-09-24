import { Field, ObjectType } from "type-graphql";

// stored as jsonb on Server.banned - only what the ban list needs
@ObjectType()
export class BannedUser {
  @Field()
  id!: number;

  @Field()
  nameId!: string;

  @Field()
  userId!: number;

  @Field()
  iconId!: string;
}
