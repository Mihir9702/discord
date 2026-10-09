import "reflect-metadata";
import "dotenv/config";
import express from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { createServer } from "node:http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express4";
import { GraphQLError, ValidationContext } from "graphql";
import depthLimit from "graphql-depth-limit";
import { rateLimit } from "express-rate-limit";
import { buildSchema } from "type-graphql";
import db, { pgConfig } from "./connect";
import { __prod__, COOKIE, CLIENT_URLS, PORT, runApp } from "./constants";
import { MyContext } from "./types";
import { UserResolver, UserFieldResolver } from "./resolvers/user";
import { ServerResolver } from "./resolvers/server";
import { MessageResolver } from "./resolvers/message";
import { ChannelResolver } from "./resolvers/channel";
import { initSocket } from "./socket";

// Bound the work done by deeply nested or alias-heavy GraphQL queries.
function limitFields(context: ValidationContext) {
  let fields = 0;
  let aliases = 0;
  return {
    Field(node: import("graphql").FieldNode) {
      fields++;
      if (node.alias) aliases++;
      if (fields === 251 || aliases === 31) {
        context.reportError(new GraphQLError("GraphQL request is too complex", { nodes: [node] }));
      }
    }
  };
}

export async function main() {
  if (__prod__ && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32)) {
    throw new Error("A strong SESSION_SECRET (at least 32 characters) is required in production");
  }

  // Never silently modify schemas. Only audited migrations may run.
  await db.initialize();
  await db.runMigrations();

  const app = express();
  const http = createServer(app);
  app.disable("x-powered-by");
  app.set("trust proxy", __prod__ ? 1 : false);
  app.use(cors({ origin: CLIENT_URLS, credentials: true }));

  const PgStore = connectPg(session);
  const sessionMiddleware = session({
    name: COOKIE,
    store: new PgStore({ conObject: pgConfig, createTableIfMissing: true }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * (__prod__ ? 7 : 30),
      httpOnly: true,
      sameSite: (process.env.COOKIE_SAMESITE as "lax" | "none") || "lax",
      secure: __prod__,
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || "express.session.cookie.secret.key",
    resave: false,
  });
  app.use(sessionMiddleware);

  const schema = await buildSchema({
    resolvers: [UserResolver, UserFieldResolver, ServerResolver, MessageResolver, ChannelResolver],
    validate: false,
  });
  const apolloServer = new ApolloServer<MyContext>({
    schema,
    introspection: !__prod__,
    csrfPrevention: true,
    includeStacktraceInErrorResponses: !__prod__,
    validationRules: [depthLimit(10), limitFields],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: http })],
  });
  await apolloServer.start();

  const limiter = rateLimit({
    windowMs: 60_000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  });

  app.use(
    "/graphql",
    limiter,
    express.json({ limit: "128kb" }),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }): Promise<MyContext> => ({
        req: req as MyContext["req"],
        res,
      }),
    })
  );

  initSocket(http, sessionMiddleware, CLIENT_URLS);
  http.listen(PORT, runApp);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
