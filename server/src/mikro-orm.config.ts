import { __prod__ } from './constants'
import { MikroORM } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import path from 'path'

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    allOrNothing: true, // if true, all migrations must be executed in one go
    disableForeignKeys: true, // if true, foreign keys will be disabled during migration
    snapshot: false, // whether to create a snapshot file
  },
  type: 'postgresql',
  host: 'localhost',
  dbName: 'imari',
  port: 5432,
  entities: [__dirname + '/entities/*.ts'],
  metadataProvider: TsMorphMetadataProvider,
  allowGlobalContext: true,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  debug: !__prod__,
  // Type of MikroORM.init method.
} as Parameters<typeof MikroORM.init>[0]
