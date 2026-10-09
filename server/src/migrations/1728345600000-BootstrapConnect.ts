import { MigrationInterface, QueryRunner } from "typeorm";

/** Safe additive baseline: never drops historical records. */
export class BootstrapConnect1728345600000 implements MigrationInterface {
  name = "BootstrapConnect1728345600000";

  async up(q: QueryRunner): Promise<void> {
    await q.query(`CREATE TABLE IF NOT EXISTS "user" (
      "id" SERIAL PRIMARY KEY, "username" text NOT NULL,
      "password" text NOT NULL, "userId" integer NOT NULL,
      "nameId" text NOT NULL, "iconId" text NOT NULL,
      "status" text NOT NULL DEFAULT 'online', "roles" jsonb,
      "friendRequests" jsonb,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NOT NULL DEFAULT now()
    )`);
    await q.query(`CREATE TABLE IF NOT EXISTS "server" (
      "id" SERIAL PRIMARY KEY, "name" varchar NOT NULL, "icon" varchar,
      "link" varchar NOT NULL, "serverId" integer NOT NULL, "banned" jsonb,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NOT NULL DEFAULT now()
    )`);
    await q.query(`CREATE TABLE IF NOT EXISTS "channel" (
      "id" SERIAL PRIMARY KEY, "name" text, "desc" text,
      "channelId" text NOT NULL, "ptChat" boolean NOT NULL DEFAULT false,
      "serverId" integer REFERENCES "server"("id") ON DELETE CASCADE,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NOT NULL DEFAULT now()
    )`);
    await q.query(`CREATE TABLE IF NOT EXISTS "message" (
      "id" SERIAL PRIMARY KEY, "msg" varchar NOT NULL, "msgId" text NOT NULL,
      "edited" boolean NOT NULL DEFAULT false,
      "userId" integer REFERENCES "user"("id") ON DELETE CASCADE,
      "channelId" integer REFERENCES "channel"("id") ON DELETE CASCADE,
      "createdAt" timestamp NOT NULL DEFAULT now(),
      "updatedAt" timestamp NOT NULL DEFAULT now()
    )`);
    await q.query(`CREATE TABLE IF NOT EXISTS "user_friends_user" (
      "userId_1" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "userId_2" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      PRIMARY KEY ("userId_1","userId_2")
    )`);
    await q.query(`CREATE TABLE IF NOT EXISTS "user_blocked_user" (
      "userId_1" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "userId_2" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      PRIMARY KEY ("userId_1","userId_2")
    )`);
    await q.query(`CREATE TABLE IF NOT EXISTS "user_channels_channel" (
      "userId" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "channelId" integer NOT NULL REFERENCES "channel"("id") ON DELETE CASCADE,
      PRIMARY KEY ("userId","channelId")
    )`);
    await q.query(`CREATE TABLE IF NOT EXISTS "user_servers_server" (
      "userId" integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
      "serverId" integer NOT NULL REFERENCES "server"("id") ON DELETE CASCADE,
      PRIMARY KEY ("userId","serverId")
    )`);
    await q.query(`CREATE UNIQUE INDEX IF NOT EXISTS "connect_username_unique" ON "user" ("username")`);
    await q.query(`CREATE UNIQUE INDEX IF NOT EXISTS "connect_user_tag_unique" ON "user" ("nameId","userId")`);
    await q.query(`CREATE UNIQUE INDEX IF NOT EXISTS "connect_server_link_unique" ON "server" ("link")`);
    await q.query(`CREATE UNIQUE INDEX IF NOT EXISTS "connect_server_public_id_unique" ON "server" ("serverId")`);
    await q.query(`CREATE UNIQUE INDEX IF NOT EXISTS "connect_channel_public_id_unique" ON "channel" ("channelId")`);
    await q.query(`CREATE UNIQUE INDEX IF NOT EXISTS "connect_message_public_id_unique" ON "message" ("msgId")`);
    await q.query(`CREATE INDEX IF NOT EXISTS "connect_message_channel_cursor" ON "message" ("channelId","id" DESC)`);
    await q.query(`CREATE INDEX IF NOT EXISTS "connect_friend_reverse" ON "user_friends_user" ("userId_2")`);
    await q.query(`CREATE INDEX IF NOT EXISTS "connect_block_reverse" ON "user_blocked_user" ("userId_2")`);
    await q.query(`CREATE INDEX IF NOT EXISTS "connect_channel_membership" ON "user_channels_channel" ("channelId")`);
    await q.query(`CREATE INDEX IF NOT EXISTS "connect_server_membership" ON "user_servers_server" ("serverId")`);
  }
  async down(): Promise<void> {
    throw new Error("Baseline cannot be rolled back automatically: preserve existing data.");
  }
}
