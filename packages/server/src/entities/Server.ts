import { Field, ObjectType } from 'type-graphql'
import { TextChannel } from './TextChannel'
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

  @Field({ nullable: true })
  @Column({ unique: true, nullable: true })
  tag!: string

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
  @ManyToOne(() => User, (user) => user.servers)
  members!: User

  // Server can have many textchannels
  @Field(() => [TextChannel])
  @ManyToOne(() => TextChannel, (textChannel) => textChannel.servers)
  textChannels?: TextChannel

  // The date the user was created
  @Column()
  createdAt?: Date = new Date()

  // The date the user was updated
  @CreateDateColumn()
  updatedAt?: Date = new Date()
}
