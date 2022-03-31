import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import Message from './Message'
import Server from './Server'

@Entity()
export default class User {
  @PrimaryKey()
  id!: number

  // * fullname of the user: name@nameId

  @Property()
  name!: string

  @Property({ type: 'text' })
  email!: string

  @Property({ type: 'text' })
  password!: string

  // 4 digit number that is unique to each user
  @Property({ type: 'number', unique: true })
  nameId!: number

  // avatar of the user
  @Property({ type: 'text' })
  avatar!: string

  // One user can have many friends. Friends are users that are connected to the user.
  @Property()
  friends = new Collection<User>(this)

  // The date the user was created
  @Property()
  createdAt?: Date = new Date()

  // The date the user was updated
  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date()

  // One user can have many messages.
  @OneToMany(() => Message, message => message.user)
  messages = new Collection<Message>(this)

  // One user can have many servers.
  @OneToMany(() => Server, user => user.users)
  servers = new Collection<Server>(this)

  constructor(name: string, email: string, password: string, nameId: number, avatar: string) {
    this.name = name
    this.email = email
    this.password = password
    this.nameId = nameId
    this.avatar = avatar
  }
}
