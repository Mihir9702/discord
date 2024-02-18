import { Field, ObjectType } from "type-graphql";
import { Message } from "./Message";
import { User } from "./User";
import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import { Server } from "./Server";

@ObjectType()
@Entity()
export class Channel extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "text", nullable: true }) //remove null
  name!: string;

  @Field({ nullable: true })
  @Column({ type: "text", nullable: true })
  desc?: string;

  @Field()
  @Column({ unique: true, type: "text" })
  channelId!: string;

  @Field({ defaultValue: false })
  @Column({ type: "boolean", default: false })
  ptChat!: boolean;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.channels)
  users!: User[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.channel)
  messages?: Message[];

  @Field(() => Server, { nullable: true })
  @ManyToOne(() => Server, (server) => server.channels)
  @JoinColumn()
  server?: Server;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
