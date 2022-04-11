import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Field, ObjectType, Int } from 'type-graphql'
import { Message } from './Message'
import { Server } from './Server'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
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

  // 4 digit number that is unique to each user
  @Field(() => Int)
  @Column({ type: 'number', unique: true })
  nameId?: number

  // avatar of the user
  @Field(() => String)
  @Column({ type: 'text' })
  avatar?: string

  // One user can have many friends. Friends are users that are connected to the user.
  // @Field(() => [User])
  // @Column({ type: 'text' })
  // friends?: Collection<User>

  // The date the user was created
  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date()

  // The date the user was updated
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date()
}
