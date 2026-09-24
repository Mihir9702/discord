import "reflect-metadata";
import "dotenv/config";
import express from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { createServer } from "http";
import db, { pgConfig } from "./connect";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { __prod__, COOKIE, CLIENT_URLS, PORT, runApp } from "./constants";
import { MyContext } from "./types";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { UserResolver, UserFieldResolver } from "./resolvers/user";
import { ServerResolver } from "./resolvers/server";
import { MessageResolver } from "./resolvers/message";
import { ChannelResolver } from "./resolvers/channel";
import { initSocket } from "./socket";

const main = async () => {
  // Connect to Database
  await db.initialize();
  await db.runMigrations();

  const app = express();
  const http = createServer(app);

  // behind a proxy (heroku, render, nginx...) in production
  app.set("trust proxy", __prod__ ? 1 : false);

  app.use(
    cors({
      origin: CLIENT_URLS,
      credentials: true,
    })
  );

  if (__prod__ && !process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET must be set in production");
  }

  // sessions live in postgres so restarts don't log everyone out
  const PgStore = connectPg(session);

  const sessionMiddleware = session({
    name: COOKIE,
    store: new PgStore({ conObject: pgConfig, createTableIfMissing: true }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      // csrf - set COOKIE_SAMESITE=none if the client + api are on different sites
      sameSite: (process.env.COOKIE_SAMESITE as "lax" | "none") || "lax",
      secure: __prod__, // cookie only works in https
    },
    saveUninitialized: false, // don't create session until something stored
    secret: process.env.SESSION_SECRET || "express.session.cookie.secret.key",
    resave: false, // false // do not save session if unmodified
  });

  app.use(sessionMiddleware);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        UserFieldResolver,
        ServerResolver,
        MessageResolver,
        ChannelResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  initSocket(http, sessionMiddleware, CLIENT_URLS);

  http.listen(PORT, runApp);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
