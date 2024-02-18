import 'dotenv/config'
import { __prod__ } from './constants'
import { DataSource } from 'typeorm'
import path from 'path'

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASS || 'postgres',
  database: 'connect',
  synchronize: true,
  // logging: true,
  entities: [path.join(__dirname, 'entities/**/*.ts')],
})
