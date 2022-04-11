import { Migration } from '@mikro-orm/migrations';

export class Migration20220402084659 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "name" varchar(255) not null, "email" text null, "username" text not null, "password" text not null, "name_id" int null, "avatar" text null, "friends" varchar(255) null, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null);');
    this.addSql('alter table "user" add constraint "user_name_id_unique" unique ("name_id");');

    this.addSql('create table "server" ("id" serial primary key, "name" varchar(255) not null, "owner" varchar(255) null, "icon" varchar(255) null, "channels" text null, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "users_id" int null);');

    this.addSql('create table "message" ("id" serial primary key, "content" varchar(255) not null, "user_id" int null, "server_id" int null, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null);');

    this.addSql('alter table "server" add constraint "server_users_id_foreign" foreign key ("users_id") references "user" ("id") on update cascade on delete set null;');

    this.addSql('alter table "message" add constraint "message_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;');
    this.addSql('alter table "message" add constraint "message_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "server" drop constraint "server_users_id_foreign";');

    this.addSql('alter table "message" drop constraint "message_user_id_foreign";');

    this.addSql('alter table "message" drop constraint "message_server_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "server" cascade;');

    this.addSql('drop table if exists "message" cascade;');
  }

}
