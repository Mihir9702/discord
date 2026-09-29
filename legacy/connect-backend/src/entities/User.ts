import { Field, ObjectType } from "type-graphql";
import { Message } from "./Message";
import { Channel } from "./Channel";
import { Server } from "./Server";
import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { FriendRequest } from "./FriendRequest";
import { ServerRole } from "./ServerRole";

export declare type UserStatus = "online" | "idle" | "dnd" | "offline";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "text" })
  username!: string;

  @Column({ type: "text" })
  password!: string;

  @Field()
  @Column()
  userId!: number;

  @Field()
  @Column({ type: "text" })
  nameId!: string;

  @Field()
  @Column({ type: "text" })
  iconId!: string;

  @Field({ defaultValue: "online" })
  @Column({ type: "text", default: "online" })
  status!: UserStatus;

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[];

  @Field(() => [Server], { nullable: true })
  @ManyToMany(() => Server, (server) => server.users)
  @JoinTable()
  servers?: Server[];

  @Field(() => [ServerRole], { nullable: true })
  @Column("jsonb", { nullable: true })
  roles?: ServerRole[];

  @Field(() => [Channel], { nullable: true })
  @ManyToMany(() => Channel, (channel) => channel.users)
  @JoinTable()
  channels?: Channel[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  friends?: User[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  blocked?: User[];

  @Field(() => [FriendRequest], { nullable: true })
  @Column("jsonb", { nullable: true })
  friendRequests?: FriendRequest[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
