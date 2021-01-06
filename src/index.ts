import "reflect-metadata"; //typeorm needs this
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    database: "taptab",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true, //creates tables automatically wihtout running migration
    entities: [Post, User],
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  // cors applys to all client routes
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME, //name of cookie
      store: new RedisStore({
        client: redis,
        disableTouch: true, //if enabled and the user is active it will reset cookie expiration
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true, //security: frontend JS code cannot accesss cookie
        sameSite: "lax", // related to protecting csrf
        secure: __prod__, // cookie only works in https when in production
      },
      saveUninitialized: false, //create a session by default even with no data in it
      secret: "dklsadjskdjladj",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
