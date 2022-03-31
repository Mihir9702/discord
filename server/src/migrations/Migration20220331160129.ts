import { Migration } from '@mikro-orm/migrations';

export class Migration20220331160129 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "name" varchar(255) not null, "email" text not null, "password" text not null, "name_id" int not null, "avatar" text not null, "friends" varchar(255) not null, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null);');
    this.addSql('alter table "user" add constraint "user_name_id_unique" unique ("name_id");');

    this.addSql('create table "server" ("id" serial primary key, "name" varchar(255) not null, "owner" varchar(255) not null, "icon" varchar(255) not null, "channels" text not null, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "users_id" int not null);');

    this.addSql('create table "message" ("id" serial primary key, "name" varchar(255) not null, "content" varchar(255) not null, "user_id" int not null, "server_id" int not null, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null);');

    this.addSql('alter table "server" add constraint "server_users_id_foreign" foreign key ("users_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "message" add constraint "message_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "message" add constraint "message_server_id_foreign" foreign key ("server_id") references "server" ("id") on update cascade;');
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
