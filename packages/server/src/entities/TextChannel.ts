import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Message } from './Message'
import { User } from './User'
import { Server } from './Server'

@ObjectType()
@Entity()
export class TextChannel extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  // The name of the channel
  @Field()
  @Column()
  name?: string

  // Users in the channel
  @Field(() => [User])
  @OneToMany(() => User, (user) => user.textChannels)
  users!: User[]

  // Messages in the channel
  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.textChannel)
  messages?: Message

  // Server the channel belongs to
  @Field(() => Server)
  @OneToMany(() => Server, (server) => server.textChannels)
  servers?: Server

  // The date the user was created
  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  // The date the user was updated
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
