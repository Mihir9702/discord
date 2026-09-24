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
  Index,
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

  @Field()
  @Column({ type: "boolean", default: false })
  edited!: boolean;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.messages, { onDelete: "CASCADE" })
  user!: User;

  @Field(() => Channel, { nullable: true })
  @Index()
  @ManyToOne(() => Channel, (channel) => channel.messages, {
    onDelete: "CASCADE",
  })
  channel!: Channel;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
