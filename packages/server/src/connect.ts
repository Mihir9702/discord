import { __prod__ } from './constants'
import { DataSource } from 'typeorm'
import path from 'path'
import 'dotenv/config'

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'imari',
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, 'entities/**/*.ts')],
})
