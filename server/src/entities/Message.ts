import {
  Entity,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  // The primary key of the message
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  // The message content
  @Field(() => String)
  @Column({ type: 'text' })
  content!: string

  // The user that sent the message
  @Field(() => Int)
  @Column({ type: 'number' })
  userId?: number

  // The server that the message was sent to
  @Field(() => Int)
  @Column({ type: 'number' })
  serverId?: number

  // The date the user was created
  @Field(() => Date)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  // The date the user was updated
  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
