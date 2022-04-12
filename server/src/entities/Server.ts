import { Field, ObjectType, Int } from 'type-graphql'
import { Message } from './Message'
import { User } from './User'
import {
  Entity,
  Column,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

enum ServerRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

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
  icon?: string

  @Field(() => [User])
  @Column({
    type: 'enum',
    enum: ServerRole,
    default: ServerRole.MEMBER,
  })
  role!: ServerRole

  @Field()
  @Column({ nullable: true })
  ownerId!: number

  // Server can have many members
  @ManyToOne(() => User, user => user.servers)
  members!: User

  // Server can have many messages.
  @ManyToOne(() => Message, message => message.server)
  messages?: Message

  // The date the user was created
  @Column()
  createdAt?: Date = new Date()

  // The date the user was updated
  @CreateDateColumn()
  updatedAt?: Date = new Date()
}
