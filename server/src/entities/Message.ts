import {
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  ManyToOne,
} from "@mikro-orm/core";
import User from "./User";
import Server from "./Server";

@Entity()
export default class Message {
  // The primary key of the message
  @PrimaryKey()
  id!: number;

  // The message content
  @Property()
  content!: string;

  // The user who sent the message
  @ManyToOne()
  user!: User;

  // The server the message was sent in
  @ManyToMany()
  server!: Server;

  // The date the message was created
  @Property()
  createdAt!: Date;

  // The date the message was updated
  @Property({ onUpdate: () => new Date() })
  updatedAt!: Date;

  constructor(content: string, user: User, server: Server) {
    this.content = content;
    this.user = user;
    this.server = server;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
