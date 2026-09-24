import { Field, ObjectType } from "type-graphql";
import { Channel } from "./Channel";
import { User } from "./User";
import { BannedUser } from "./BannedUser";
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";

@ObjectType()
@Entity()
export class Server extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  icon?: string;

  @Field()
  @Column({ unique: true })
  link!: string;

  @Field()
  @Column({ unique: true })
  serverId!: number;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.servers, { onDelete: "CASCADE" })
  users?: User[];

  @Field(() => [Channel], { nullable: true })
  @OneToMany(() => Channel, (channel) => channel.server)
  channels?: Channel[];

  @Field(() => [BannedUser], { nullable: true })
  @Column("jsonb", { nullable: true })
  banned?: BannedUser[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date = new Date();
}
