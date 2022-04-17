import { Field, ObjectType } from 'type-graphql'
import { Message } from './Message'
import { Server } from './Server'
import {
  Column,
  Entity,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { TextChannel } from './TextChannel'

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
  @Column()
  displayName!: string

  // 📧 One user can have many messages.
  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.sender)
  messages?: Message[]

  // Servers that the user is in
  @Field(() => [Server])
  @OneToMany(() => Server, (server) => server.members)
  servers?: Server[]

  // Text Channels that the user is in
  @Field(() => [TextChannel])
  @OneToMany(() => TextChannel, (textChannel) => textChannel.users)
  textChannels?: TextChannel[]

  // The date the user was created
  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  // The date the user was updated
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
