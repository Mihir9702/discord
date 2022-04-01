import { Migration } from '@mikro-orm/migrations';

export class Migration20220401211416 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "_prisma_migrations" cascade;');

    this.addSql('alter table "user" drop constraint if exists "user_email_check";');
    this.addSql('alter table "user" alter column "email" type text using ("email"::text);');
    this.addSql('alter table "user" alter column "email" drop not null;');
    this.addSql('alter table "user" drop constraint if exists "user_password_check";');
    this.addSql('alter table "user" alter column "password" type text using ("password"::text);');
    this.addSql('alter table "user" alter column "password" drop not null;');
    this.addSql('alter table "user" drop constraint if exists "user_name_id_check";');
    this.addSql('alter table "user" alter column "name_id" type int using ("name_id"::int);');
    this.addSql('alter table "user" alter column "name_id" drop not null;');
    this.addSql('alter table "user" drop constraint if exists "user_avatar_check";');
    this.addSql('alter table "user" alter column "avatar" type text using ("avatar"::text);');
    this.addSql('alter table "user" alter column "avatar" drop not null;');
    this.addSql('alter table "user" drop constraint if exists "user_friends_check";');
    this.addSql('alter table "user" alter column "friends" type varchar(255) using ("friends"::varchar(255));');
    this.addSql('alter table "user" alter column "friends" drop not null;');

    this.addSql('alter table "server" drop constraint if exists "server_icon_check";');
    this.addSql('alter table "server" alter column "icon" type varchar(255) using ("icon"::varchar(255));');
    this.addSql('alter table "server" alter column "icon" drop not null;');
    this.addSql('alter table "server" drop constraint if exists "server_channels_check";');
    this.addSql('alter table "server" alter column "channels" type text using ("channels"::text);');
    this.addSql('alter table "server" alter column "channels" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('create table "_prisma_migrations" ("id" varchar not null default null, "checksum" varchar not null default null, "finished_at" timestamptz null default null, "migration_name" varchar not null default null, "logs" text null default null, "rolled_back_at" timestamptz null default null, "started_at" timestamptz not null default now(), "applied_steps_count" int4 not null default 0);');
    this.addSql('alter table "_prisma_migrations" add constraint "_prisma_migrations_pkey" primary key ("id");');

    this.addSql('alter table "server" drop constraint if exists "server_icon_check";');
    this.addSql('alter table "server" alter column "icon" type varchar using ("icon"::varchar);');
    this.addSql('alter table "server" alter column "icon" set not null;');
    this.addSql('alter table "server" drop constraint if exists "server_channels_check";');
    this.addSql('alter table "server" alter column "channels" type text using ("channels"::text);');
    this.addSql('alter table "server" alter column "channels" set not null;');

    this.addSql('alter table "user" drop constraint if exists "user_email_check";');
    this.addSql('alter table "user" alter column "email" type text using ("email"::text);');
    this.addSql('alter table "user" alter column "email" set not null;');
    this.addSql('alter table "user" drop constraint if exists "user_password_check";');
    this.addSql('alter table "user" alter column "password" type text using ("password"::text);');
    this.addSql('alter table "user" alter column "password" set not null;');
    this.addSql('alter table "user" drop constraint if exists "user_name_id_check";');
    this.addSql('alter table "user" alter column "name_id" type int4 using ("name_id"::int4);');
    this.addSql('alter table "user" alter column "name_id" set not null;');
    this.addSql('alter table "user" drop constraint if exists "user_avatar_check";');
    this.addSql('alter table "user" alter column "avatar" type text using ("avatar"::text);');
    this.addSql('alter table "user" alter column "avatar" set not null;');
    this.addSql('alter table "user" drop constraint if exists "user_friends_check";');
    this.addSql('alter table "user" alter column "friends" type varchar using ("friends"::varchar);');
    this.addSql('alter table "user" alter column "friends" set not null;');
  }

}
