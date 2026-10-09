import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { printSchema } from "graphql";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { UserResolver, UserFieldResolver } from "./resolvers/user";
import { ServerResolver } from "./resolvers/server";
import { MessageResolver } from "./resolvers/message";
import { ChannelResolver } from "./resolvers/channel";

async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver, UserFieldResolver, ServerResolver, MessageResolver, ChannelResolver],
    validate: false,
  });
  writeFileSync(resolve(__dirname, "../schema.graphql"), printSchema(schema) + "\n");
  console.log("GraphQL schema generated offline from resolvers");
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
