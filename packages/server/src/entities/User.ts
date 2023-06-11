import { Field, ObjectType } from 'type-graphql'
import { Message } from './Message'
import { Server } from './Server'
import { Channel } from './Channel'
import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { FriendRequest } from '../types'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ type: 'text' })
  username!: string

  @Column({ type: 'text' })
  password!: string

  @Field()
  @Column()
  userId!: number

  @Field()
  @Column({ type: 'text' })
  nameId!: string

  @Field({ defaultValue: 'online' })
  @Column({ type: 'text', default: 'online' })
  status!: string

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.ownerId)
  messages?: Message[]

  @Field(() => [Server], { nullable: true })
  @OneToMany(() => Server, (server) => server.members)
  servers?: Server[]

  @Field(() => [Channel], { nullable: true })
  @OneToMany(() => Channel, (channel) => channel.users)
  channels?: Channel[]

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.id)
  friendRequests?: FriendRequest[]

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.id)
  friends?: User[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()

  getServers() {
    return this.servers
  }

  getFriends() {
    return this.friends
  }

  getFriendRequests() {
    return this.friendRequests
  }

  getFriendChannels() {
    return this.channels && this.channels.filter((ch) => ch.users.length === 2)
  }
}
