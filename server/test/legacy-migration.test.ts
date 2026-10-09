import "reflect-metadata";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { test } from "node:test";
import { DataSource } from "typeorm";
import newDatabase from "../src/connect";
import { User } from "../src/entities/User";
import { Server } from "../src/entities/Server";
import { Channel } from "../src/entities/Channel";
import { Message } from "../src/entities/Message";

// Only run against the explicit disposable CI database. Never point this at
// a real Connect database: simulating the old schema uses synchronize: true.
const requestedUrl = process.env.DATABASE_URL || "";
const safeTarget = (() => {
  try { return new URL(requestedUrl).pathname === "/connect_discord_rehearsal_ci"; }
  catch { return false; }
})();
const enabled = process.env.MIGRATION_REHEARSAL === "1" && safeTarget;
const tables = [
  "user", "server", "channel", "message",
  "user_friends_user", "user_blocked_user",
  "user_channels_channel", "user_servers_server",
];

const fingerprint = async (db: DataSource) => {
  const entries: Record<string, unknown> = {};
  for (const name of tables) {
    const rows = await db.query('SELECT * FROM "' + name + '"');
    const normalized = rows.map((row: Record<string, unknown>) =>
      JSON.stringify(Object.fromEntries(Object.entries(row).sort(([a],[b]) => a.localeCompare(b))))
    ).sort();
    entries[name] = normalized;
  }
  return createHash("sha256").update(JSON.stringify(entries)).digest("hex");
};

const columns = async (db: DataSource) => {
  const rows = await db.query(
    "SELECT table_name, column_name, data_type, is_nullable FROM information_schema.columns WHERE table_schema='public' AND table_name IN ('user','server','channel','message','user_friends_user','user_blocked_user','user_channels_channel','user_servers_server') ORDER BY table_name, ordinal_position"
  );
  return rows.map((r: Record<string,string>) => JSON.stringify(r));
};

test("migrate real legacy TypeORM schema containing linked synthetic records without altering them",
  { skip: !enabled && "Only enabled in disposable connect_discord_rehearsal_ci" },
  async () => {
    assert.equal(newDatabase.options.synchronize, false);
    const legacyDb = new DataSource({
      type: "postgres", url: requestedUrl,
      entities: [User, Server, Channel, Message],
      synchronize: true, // ONLY for the isolated, verified empty fixture DB.
      logging: false,
    });
    const probe = new DataSource({type: "postgres", url: requestedUrl, entities: [User,Server,Channel,Message], synchronize:false});
    await probe.initialize();
    try {
      const existing = await probe.query("SELECT to_regclass('public.user') as present");
      assert.equal(existing[0].present, null, "Rehearsal DB must start empty");
    } finally { await probe.destroy(); }

    await legacyDb.initialize();
    let originalFingerprint: string;
    let originalColumns: string[];
    try {
      const users = legacyDb.getRepository(User);
      const servers = legacyDb.getRepository(Server);
      const channels = legacyDb.getRepository(Channel);
      const messages = legacyDb.getRepository(Message);

      const alice = await users.save(users.create({
        username: "legacy_alice", password: "historical-hash",
        nameId: "LegacyAlice", userId: 1212, iconId: "#123456",
        status: "online", roles: [{serverId: 777777, role: "owner"}],
        friendRequests: [{nameId: "LegacyCarol", userId: 3434, status: "incoming", iconId: "#ff8800"}],
      }));
      const bob = await users.save(users.create({
        username: "legacy_bob", password: "historical-hash",
        nameId: "LegacyBob", userId: 2323, iconId: "#abcdef",
        status: "idle", roles: [{serverId: 777777, role: "member"}],
        friendRequests: [],
      }));
      const carol = await users.save(users.create({
        username: "legacy_carol", password: "historical-hash",
        nameId: "LegacyCarol", userId: 3434, iconId: "#ff8800",
        status: "offline", roles: [], friendRequests: [],
      }));
      const legacyServer = await servers.save(servers.create({
        name: "Legacy General", serverId: 777777, link: "Old123",
        banned: [{id: carol.id, nameId: carol.nameId, userId: carol.userId, iconId: carol.iconId}],
      }));
      const textChannel = await channels.save(channels.create({
        name: "general", channelId: "234567890123456", ptChat: false,
        server: legacyServer, desc: "Original chat topic",
      }));
      const dm = await channels.save(channels.create({
        name: "876543210123456", channelId: "876543210123456", ptChat: true,
      }));
      const link = async (entity: typeof User, relation: string, sourceId: number, destId: number) => {
        await legacyDb.createQueryBuilder().relation(entity, relation).of(sourceId).add(destId);
      };
      await link(User, "servers", alice.id, legacyServer.id);
      await link(User, "servers", bob.id, legacyServer.id);
      await link(User, "friends", alice.id, bob.id);
      await link(User, "friends", bob.id, alice.id);
      await link(User, "blocked", alice.id, carol.id);
      await link(User, "channels", alice.id, dm.id);
      await link(User, "channels", bob.id, dm.id);
      await messages.save(messages.create({
        msg: "Old message with unmodified timestamps",
        msgId: "3456789012", user: alice, channel: textChannel,
      }));
      await messages.save(messages.create({
        msg: "Existing DM message",
        msgId: "4567890123", user: bob, channel: dm,
      }));
      const legacyTables = await legacyDb.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'"
      );
      for (const table of tables) {
        assert.ok(legacyTables.some((r:{table_name:string})=>r.table_name===table), table);
      }
      originalFingerprint = await fingerprint(legacyDb);
      originalColumns = await columns(legacyDb);
      console.log("Legacy snapshot prepared: 3 users, 1 server, 2 channels, 2 messages, friend/block and membership links");
      console.log("Pre-migration data hash:", originalFingerprint);
    } finally { await legacyDb.destroy(); }

    await newDatabase.initialize();
    try {
      const migrations = await newDatabase.runMigrations();
      assert.equal(migrations.length, 1, "Expected exactly one additive baseline migration");
      assert.equal(await fingerprint(newDatabase), originalFingerprint, "Historical data changed during migration");
      assert.deepEqual(await columns(newDatabase), originalColumns, "Historical columns unexpectedly changed");
      assert.equal((await newDatabase.runMigrations()).length, 0, "Migration not idempotent");
      assert.equal(await fingerprint(newDatabase), originalFingerprint, "Second migration run changed data");
      const after = await newDatabase.query(
        "SELECT indexname FROM pg_indexes WHERE schemaname='public' AND tablename='message'"
      );
      assert.ok(after.some((r:{indexname:string})=>r.indexname==="connect_message_channel_cursor"));
      const linked = await newDatabase.getRepository(User).findOne({
        where: {username: "legacy_alice"}, relations:["servers", "channels", "friends", "blocked"]
      });
      assert.equal(linked?.servers?.length, 1);
      assert.equal(linked?.channels?.length, 1);
      assert.equal(linked?.friends?.length, 1);
      assert.equal(linked?.blocked?.length, 1);
      console.log("Rehearsal PASS: legacy records, columns, relationships and hashes preserved; rerun idempotent");
    } finally { await newDatabase.destroy(); }
  }
);
