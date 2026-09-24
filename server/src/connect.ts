import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Server } from "./entities/Server";
import { Channel } from "./entities/Channel";
import { Message } from "./entities/Message";

// postgres connection settings - also used by the session store
export const pgConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      host: process.env.POSTGRES_HOST || "localhost",
      port: Number(process.env.POSTGRES_PORT) || 5432,
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASS || "postgres",
      database: process.env.POSTGRES_DB || "connect",
    };

export default new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // takes priority over the fields below when set
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASS || "postgres",
  database: process.env.POSTGRES_DB || "connect",
  synchronize: true,
  // logging: true,
  // imported directly so it works from both src (ts-node) and dist (node)
  entities: [User, Server, Channel, Message],
});
