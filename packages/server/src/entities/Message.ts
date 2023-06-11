import { Field, ObjectType } from 'type-graphql'
import { User } from './User'
import {
  Entity,
  Column,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm'
import { Channel } from './Channel'

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  content!: string

  @Field()
  @Column()
  messageId!: number

  @Field(() => User)
  @OneToOne(() => User, (user) => user.id)
  ownerId!: User

  @Field(() => Channel)
  @OneToOne(() => Channel, (channel) => channel.channelId)
  channelId!: number

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()

  getUser() {
    return this.ownerId
  }

  getContent() {
    return this.content
  }
}
