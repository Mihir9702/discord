import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import "dotenv/config";

export default {
  dbName: "smtemp",
  type: "postgresql",
  entities: [__dirname + "/entities/*.ts"],
  metadataProvider: TsMorphMetadataProvider,
  allowGlobalContext: true,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
