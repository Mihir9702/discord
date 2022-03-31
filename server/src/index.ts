import 'reflect-metadata'
import express from 'express'
import mikroConfig from './mikro-orm.config'
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

const main = async () => {
  const orm = await MikroORM.init(mikroConfig)
  await orm.getMigrator().up()

  const app = express()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/resolvers/*.ts'],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  })

  apolloServer.applyMiddleware({ app })
  app.listen(3000, () => console.log('🚀 Server started on http://localhost:3000'))
}

main()
