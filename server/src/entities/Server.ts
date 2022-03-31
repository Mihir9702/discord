import { Entity, PrimaryKey, Property, Collection, OneToMany, ManyToOne } from '@mikro-orm/core'
import { User } from './User'
import { Message } from './Message'

@Entity()
export class Server {
  @PrimaryKey()
  id!: number

  @Property()
  name!: string

  // Server can have one owner.
  @Property()
  owner!: User

  // icon of the server
  @Property()
  icon!: string

  // Server can have many channels.
  @Property({ type: 'text' })
  channels!: string

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
  users!: User

  constructor(name: string, owner: User, icon: string, channels: string) {
    this.name = name
    this.owner = owner
    this.icon = icon
    this.channels = channels
  }
}
