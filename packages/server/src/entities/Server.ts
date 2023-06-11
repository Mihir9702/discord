import { Field, ObjectType } from 'type-graphql'
import { Channel } from './Channel'
import { User } from './User'
import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm'
import { ServerRole } from '../types'
import { generateNumber } from '../helpers/rand'

@ObjectType()
@Entity()
export class Server extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  name!: string

  @Field()
  @Column({ nullable: true })
  icon!: string

  @Field()
  @Column({ unique: true, nullable: true })
  link!: string

  @Field(() => [User])
  @Column({
    type: 'enum',
    enum: ServerRole,
    default: ServerRole.MEMBER,
  })
  role!: ServerRole

  @Field()
  @Column({ unique: true })
  serverId!: number

  @Field(() => User)
  @OneToOne(() => User, (user) => user.id)
  ownerId!: User

  @Field(() => [User])
  @ManyToOne(() => User, (user) => user.id)
  members?: User[]

  @Field(() => [Channel])
  @ManyToOne(() => Channel, (channel) => channel.channelId)
  channels?: Channel[]

  @Column()
  createdAt?: Date = new Date()

  @CreateDateColumn()
  updatedAt?: Date = new Date()

  getName() {
    return this.name
  }

  getIcon() {
    return this.icon
  }

  getLink() {
    return this.link
  }

  getMembers() {
    return this.members
  }

  getChannels() {
    return this.channels
  }

  async init() {
    return await Channel.create({
      name: 'general',
      messages: [],
      users: [this.ownerId],
      channelId: generateNumber(10),
    }).save()
  }
}
