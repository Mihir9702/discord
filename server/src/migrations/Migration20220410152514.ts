import { Migration } from '@mikro-orm/migrations';

export class Migration20220410152514 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_password_check";');
    this.addSql('alter table "user" alter column "password" type text using ("password"::text);');
    this.addSql('alter table "user" alter column "password" set not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_password_check";');
    this.addSql('alter table "user" alter column "password" type text using ("password"::text);');
    this.addSql('alter table "user" alter column "password" drop not null;');
  }

}
