import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import {
  Entity,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Channel } from "./Channel";

// reply ?

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  msg!: string;

  @Field()
  @Column({ type: "text" })
  msgId!: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.messages)
  user!: User;

  @Field(() => Channel, { nullable: true })
  @ManyToOne(() => Channel, (channel) => channel.messages)
  channel!: Channel;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
