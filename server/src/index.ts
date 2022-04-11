import 'reflect-metadata'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createClient } from 'redis'
import { COOKIE, __prod__ } from './constants'
import { MyContext } from './types'
import { DataSource } from 'typeorm'

const main = async () => {
  // create a connection using typeorm not mikro-orm dont worry about imports i will import later
  const conn = await new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'imari',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/entities/*.ts'],
  })

  const app = express()

  // ! Redis not working at the moment
  const RedisStore = connectRedis(session)
  const redisClient = createClient()
  redisClient.connect()

  app.use(cors({ origin: 'http://localhost:8888', credentials: true }))

  app.use(
    session({
      name: COOKIE,
      // store: new RedisStore({
      //   client: redisClient,
      //   disableTouch: true, // disable touch to prevent session expiration
      //   disableTTL: true, // disable ttl to prevent session expiration
      // }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        // secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false, // don't create session until something stored
      secret: (process.env.SESSION_SECRET as string) || 'aslkdfjoiq12312',
      resave: false, // do not save session if unmodified
    }),
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/resolvers/*.ts'],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(3000, () => console.log('🚀 Server started on http://localhost:3000'))
}

main()
