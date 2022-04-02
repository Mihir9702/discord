import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core'
import { User } from './User'
import { Server } from './Server'
import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class Message {
  // The primary key of the message
  @Field(() => Int)
  @PrimaryKey()
  id!: number

  // The message content
  @Field(() => String)
  @Property()
  content!: string

  // * I don't know if I will need this.
  // The user that sent the message
  @Property({ type: 'number' })
  userId?: number

  // * I don't know if I will need this.
  // The server that the message was sent to
  @Property({ type: 'number' })
  serverId?: number

  // The date the user was created
  @Property()
  createdAt?: Date = new Date()

  // The date the user was updated
  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date()

  // The user that sent the message
  @ManyToOne(() => User)
  user?: User

  @ManyToOne(() => Server)
  server?: Server
}
