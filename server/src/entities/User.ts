import { Field, ObjectType } from 'type-graphql'
import { Message } from './Message'
import { Server } from './Server'
import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
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

  // * fullname of the user: name@nameId
  // * ! | username, password,
  // * ? | email, nameId, friends,

  @Field(() => String)
  @Column({ type: 'text' })
  username!: string

  @Column({ type: 'text' })
  password!: string

  // 🔳 avatar of the user
  @Field()
  @Column({ nullable: true })
  avatar?: string

  // 📧 One user can have many messages.
  @Field(() => [Message])
  @OneToMany(() => Message, message => message.sender)
  messages?: Message[]

  // Servers that the user is in
  @Field(() => [Server])
  @OneToMany(() => Server, server => server.members)
  servers?: Server[]

  // The date the user was created
  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  // The date the user was updated
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
