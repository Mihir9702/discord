import { Entity, PrimaryKey, Property, Collection, OneToMany, ManyToOne } from '@mikro-orm/core'
import { User } from './User'
import { Message } from './Message'
import { Field, ObjectType, Int } from 'type-graphql'

@ObjectType()
@Entity()
export class Server {
  @Field(() => Int)
  @PrimaryKey()
  id!: number

  @Field(() => String)
  @Property()
  name!: string

  // Server can have one owner.
  @Field(() => User)
  @Property()
  owner?: User

  // icon of the server
  @Field(() => String)
  @Property()
  icon?: string

  // Server can have many channels.
  @Field(() => [String])
  @Property({ type: 'text' })
  channels?: string

  // The date the user was created
  @Property()
  createdAt?: Date = new Date()

  // The date the user was updated
  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date()

  // One server can have many messages.
  @OneToMany(() => Message, message => message.server)
  messages = new Collection<Message>(this)

  // Server can have many users.
  @ManyToOne(() => User)
  users?: User
}
