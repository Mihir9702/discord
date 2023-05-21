import { Field, ObjectType } from 'type-graphql'
import { Message } from './Message'
import { Server } from './Server'
import { TextChannel } from './TextChannel'
import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

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
  displayName!: string

  @Field({ defaultValue: 'online' })
  @Column({ type: 'text', default: 'online' })
  status!: string

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.sender)
  messages?: Message[]

  @Field(() => [Server])
  @OneToMany(() => Server, (server) => server.members)
  servers?: Server[]

  @Field(() => [TextChannel])
  @OneToMany(() => TextChannel, (textChannel) => textChannel.users)
  textChannels?: TextChannel[]

  // @Field(() => [User], { nullable: true })
  // @Column('text', { array: true, nullable: true })
  // friendRequests?: User[]

  @Field(() => [User], { nullable: true })
  @Column('text', { array: true, nullable: true })
  friendRequests?: User[] | undefined

  // @Column('text', { array: true, nullable: true })
  // @OneToMany(() => User, (user) => user.id)
  @Field(() => [User], { nullable: true })
  @Column('text', { array: true, nullable: true })
  friends?: User[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
