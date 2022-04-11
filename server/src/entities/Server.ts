import { Field, ObjectType, Int } from 'type-graphql'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from 'typeorm'

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

  // The date the user was created
  @Column()
  createdAt?: Date = new Date()

  // The date the user was updated
  @CreateDateColumn()
  updatedAt?: Date = new Date()

  // One server can have many messages.
  // @Column()
  // messages = new Collection<Message>(this)
}
