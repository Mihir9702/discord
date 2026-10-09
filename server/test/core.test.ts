import "reflect-metadata";
import assert from "node:assert/strict";
import { test } from "node:test";
import { UserFieldResolver } from "../src/resolvers/user";
import { User } from "../src/entities/User";
import { Channel } from "../src/entities/Channel";
import { Server } from "../src/entities/Server";
import { Message } from "../src/entities/Message";
import { MyContext } from "../src/types";
import { assertLoginAllowed, failedLogin, successfulLogin } from "../src/security/login";
import {
  validateUsername, validatePassword, validateMessage, validateStatus, inviteCode
} from "../src/helpers/validate";
import { randomStringGenerator } from "../src/helpers/random";
import { printSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../src/resolvers/user";
import { ServerResolver } from "../src/resolvers/server";
import { ChannelResolver } from "../src/resolvers/channel";
import { MessageResolver } from "../src/resolvers/message";

test("validation rejects malformed identities, messages and statuses", () => {
  assert.equal(validateUsername("person_1"), null);
  assert.ok(validateUsername("a"));
  assert.ok(validateUsername("bad name"));
  assert.ok(validatePassword("short", true));
  assert.equal(validatePassword("Secure$Password1", true), null);
  assert.ok(validateMessage(""));
  assert.ok(validateMessage("x".repeat(2001)));
  assert.equal(validateStatus("offline"), null);
  assert.ok(validateStatus("away"));
  assert.equal(inviteCode("https://example.test/invite/a1b2?tracking=true"), "a1b2");
});

test("invite codes use cryptographically secure random generator", () => {
  const codes = new Set(Array.from({ length: 100 }, () => randomStringGenerator(16)));
  assert.equal(codes.size, 100);
  for (const code of codes) assert.match(code, /^[a-zA-Z0-9]{16}$/);
});

test("login throttle rejects repeated failures and expires without blocking other users", () => {
  const user = "unit_" + randomStringGenerator(14);
  const ip = "192.0.2.17";
  for (let i = 0; i < 8; i++) failedLogin(user, ip, 1000);
  assert.throws(() => assertLoginAllowed(user, ip, 1000), /Too many/);
  assert.doesNotThrow(() => assertLoginAllowed(user, "192.0.2.18", 1000));
  assert.doesNotThrow(() => assertLoginAllowed(user, ip, 1000 + 15 * 60_000));
  successfulLogin(user, ip);
  assert.doesNotThrow(() => assertLoginAllowed(user, ip, 1000));
});

test("nested user objects do not disclose another account's private data", () => {
  const resolver = new UserFieldResolver();
  const victim = Object.assign(new User(), {
    id: 2, username: "private-user", roles: [{ serverId: 1, role: "owner" }],
    friends: [new User()], blocked: [new User()],
    channels: [new Channel()], servers: [new Server()], messages: [new Message()],
    friendRequests: [{ nameId: "Someone", userId: 1234, status: "incoming", iconId: "#ffffff" }],
  });
  const other = { req: { session: { idx: 1 } } } as MyContext;
  const own = { req: { session: { idx: 2 } } } as MyContext;
  assert.equal(resolver.username(victim, other), null);
  assert.equal(resolver.roles(victim, other), null);
  assert.equal(resolver.friendRequests(victim, other), null);
  assert.equal(resolver.friends(victim, other), null);
  assert.equal(resolver.blocked(victim, other), null);
  assert.equal(resolver.channels(victim, other), null);
  assert.equal(resolver.servers(victim, other), null);
  assert.equal(resolver.messages(victim, other), null);
  assert.equal(resolver.username(victim, own), "private-user");
  assert.equal(resolver.friends(victim, own)?.length, 1);
});

test("GraphQL schema includes paginated messages and no password field", async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, UserFieldResolver, ServerResolver, ChannelResolver, MessageResolver],
    validate: false,
  });
  const source = printSchema(schema);
  assert.match(source, /messages\(beforeId: Int, channelId: String!\)/);
  assert.match(source, /hasMore: Boolean!/);
  const userBlock = source.split("type User {")[1].split("}")[0];
  assert.doesNotMatch(userBlock, /password/);
});
