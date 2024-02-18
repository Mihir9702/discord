import "reflect-metadata";
import "dotenv/config";
import express from "express";
import session from "express-session";
import db from "./connect";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { __prod__, COOKIE, runApp } from "./constants";
import { MyContext } from "./types";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { UserResolver } from "./resolvers/user";
import { ServerResolver } from "./resolvers/server";
import { MessageResolver } from "./resolvers/message";
import { ChannelResolver } from "./resolvers/channel";

const main = async () => {
  // Connect to Database
  await db.initialize();
  await db.runMigrations();

  const app = express();

  app.set("trust proxy", __prod__);

  app.use(
    cors({
      origin: ["http://localhost:3001", "0.0.0.0:8888"],
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: !__prod__, // cookie only works in https
      },
      saveUninitialized: false, // don't create session until something stored
      secret: process.env.SESSION_SECRET as string,
      resave: false, // false // do not save session if unmodified
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        ServerResolver,
        MessageResolver,
        ChannelResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(3000, runApp);
};

main();
