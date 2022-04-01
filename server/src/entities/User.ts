import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { Field, ObjectType, Int } from 'type-graphql'
import { Message } from './Message'
import { Server } from './Server'

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number

  // * fullname of the user: name@nameId

  @Field(() => String)
  @Property()
  name!: string

  @Field(() => String)
  @Property({ type: 'text' })
  email?: string

  @Field(() => String)
  @Property({ type: 'text' })
  password?: string

  // 4 digit number that is unique to each user
  @Field(() => Int)
  @Property({ type: 'number', unique: true })
  nameId?: number

  // avatar of the user
  @Field(() => String)
  @Property({ type: 'text' })
  avatar?: string

  // One user can have many friends. Friends are users that are connected to the user.
  @Field(() => [User])
  @Property()
  friends?: Collection<User>

  // The date the user was created
  @Field(() => String)
  @Property()
  createdAt?: Date = new Date()

  // The date the user was updated
  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date()

  // One user can have many messages.
  @OneToMany(() => Message, message => message.user)
  messages = new Collection<Message>(this)

  // One user can have many servers.
  @OneToMany(() => Server, user => user.users)
  servers = new Collection<Server>(this)
}
