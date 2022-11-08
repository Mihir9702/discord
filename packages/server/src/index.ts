import 'reflect-metadata'
import express from 'express'
import session from 'express-session'
import db from './connect'
import cors from 'cors'
// import { createClient } from 'redis'
// import connectRedis from 'connect-redis'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { __prod__ } from './constants'
import { MyContext } from './types'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

const main = async () => {
  // Connect to Database
  await db.initialize()
  await db.runMigrations()

  const app = express()

  // const RedisStore = connectRedis(session)
  // const RedisClient = createClient({ legacyMode: true })

  // await RedisClient.connect()

  app.set('trust proxy', __prod__)

  app.use(
    cors({
      origin: 'http://localhost:8888',
      credentials: true,
    }),
  )

  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    }),
  )

  // app
  //   .use
  // session({
  //   name: COOKIE,
  //   store: new RedisStore({
  //     client: RedisClient,
  //     disableTouch: true,
  //   }),
  //   cookie: {
  //     maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
  //     httpOnly: true,
  //     sameSite: 'lax', // csrf
  //     secure: __prod__, // cookie only works in https
  //   },
  //   saveUninitialized: false, // don't create session until something stored
  //   secret: (process.env.SESSION_SECRET as string) || 'akwljdlkawmdlkawjdoiajkl',
  //   resave: false, // do not save session if unmodified
  // }),
  // ()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/resolvers/*.ts'],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(3000, () => console.log('🚀 Server started on http://localhost:3000'))
}

main()
