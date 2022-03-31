import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import Message from "./Message";
import Server from "./Server";

@Entity()
export default class User {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt?: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property({ nullable: true })
  age?: number;

  @Property()
  termsAccepted: boolean = false;

  @OneToMany(() => Server, (server) => server.users)
  servers = new Collection<Server>(this);

  @OneToMany(() => Message, (message) => message.user)
  messages = new Collection<Message>(this);

  @ManyToMany(() => User)
  friends = new Collection<User>(this);

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
