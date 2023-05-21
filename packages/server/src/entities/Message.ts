import { Field, ObjectType } from 'type-graphql'
import { User } from './User'
import { TextChannel } from './TextChannel'
import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  // The primary key of the message
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  // The message content
  @Field()
  @Column()
  content!: string

  // The user that sent the message
  @Field()
  @Column()
  senderId?: string

  @Field()
  @Column({ nullable: true })
  serverId?: number

  @ManyToOne(() => User, (user) => user.messages)
  sender?: User

  // The text channel the message was sent in
  @Field()
  @Column()
  textChannelId!: number

  @ManyToOne(() => TextChannel, (textChannel) => textChannel.messages)
  textChannel!: TextChannel

  // The date the user was created
  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  // The date the user was updated
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
