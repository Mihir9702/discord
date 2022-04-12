import { Field, ObjectType, Int } from 'type-graphql'
import { Message } from './Message'
import { User } from './User'
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

@ObjectType()
@Entity()
export class Server extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column()
  name!: string

  // icon of the server
  @Field(() => String)
  @Column()
  icon?: string

  // Server can have many channels.
  @Field(() => [String])
  @Column()
  channels?: string

  // Server can have many members.
  @ManyToOne(() => User, user => user.servers)
  members?: User

  // Server can have many messages.
  @OneToMany(() => Message, message => message.server)
  messages?: Message

  // The date the user was created
  @Column()
  createdAt?: Date = new Date()

  // The date the user was updated
  @CreateDateColumn()
  updatedAt?: Date = new Date()
}
