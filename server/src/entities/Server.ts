import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  ManyToOne,
} from "@mikro-orm/core";
import User from "./User";
import Message from "./Message";

@Entity()
export default class Server {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  createdAt!: Date;

  @Property({ onUpdate: () => new Date() })
  updatedAt!: Date;

  @ManyToOne()
  users!: User[];

  @Property()
  messages!: Message[];

  // * This is for demonstration with OOP only
  // * Real setup will be through express routes
  constructor(name: string) {
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.users = [];
    this.messages = [];
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }

  addUser(user: User) {
    this.users.push(user);
  }

  removeUser(user: User) {
    this.users = this.users.filter((u) => u !== user);
  }

  removeMessage(message: Message) {
    this.messages = this.messages.filter((m) => m !== message);
  }

  getMessages() {
    return this.messages;
  }

  getUsers() {
    return this.users;
  }
}
