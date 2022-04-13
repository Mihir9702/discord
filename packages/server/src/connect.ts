import { __prod__ } from './constants'
import path from 'path'
import { DataSource } from 'typeorm'

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
