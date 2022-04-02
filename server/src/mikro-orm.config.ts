import { __prod__ } from './constants'
import { MikroORM } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import path from 'path'
import 'dotenv/config'

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    allOrNothing: true, // if true, all migrations must be executed in one go
    disableForeignKeys: true, // if true, foreign keys will be disabled during migration
    snapshot: false, // whether to create a snapshot file
  },
  dbName: 'imari',
  type: 'postgresql',
  entities: [__dirname + '/entities/*.ts'],
  metadataProvider: TsMorphMetadataProvider,
  allowGlobalContext: true,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  debug: !__prod__,
  // Type of MikroORM.init method.
} as Parameters<typeof MikroORM.init>[0]
