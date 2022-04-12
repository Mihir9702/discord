import { Field, ObjectType } from 'type-graphql'
import { User } from './User'
import { Server } from './Server'
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
  senderId?: number

  @ManyToOne(() => User, user => user.messages)
  sender?: User

  @ManyToOne(() => Server, server => server.messages)
  server?: Server

  // The date the user was created
  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  // The date the user was updated
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
