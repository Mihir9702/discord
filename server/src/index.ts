import 'reflect-metadata'
import express from 'express'
import mikroConfig from './mikro-orm.config'
import { MikroORM } from '@mikro-orm/core'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createClient } from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { __prod__ } from './constants'
import { MyContext } from './types'

const main = async () => {
  const orm = await MikroORM.init(mikroConfig)
  await orm.getMigrator().up()

  const app = express()

  // ! Redis not working at the moment
  // const RedisStore = connectRedis(session)
  // const redisClient = createClient()
  // redisClient.connect()

  app.use(
    session({
      name: 'qid', // cookie name
      // store: new RedisStore({
      //   client: redisClient,
      //   disableTouch: true, // disable touch to prevent session expiration
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
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  })

  apolloServer.applyMiddleware({ app })

  app.listen(3000, () => console.log('🚀 Server started on http://localhost:3000'))
}

main()
