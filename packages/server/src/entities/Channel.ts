import { Field, ObjectType } from 'type-graphql'
import { Message } from './Message'
import { User } from './User'
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
export class Channel extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  name!: string

  @Field()
  @Column({ nullable: true })
  serverId?: number

  @Field()
  @Column()
  channelId!: number

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.id)
  users!: User[]

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.channelId)
  messages?: Message[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()

  getMessages() {
    return this.messages
  }
}
