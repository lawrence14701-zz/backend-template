# technologies

- express server because of the high quality middleware

- apollo server that allows us to create graphql endpoints

- graphql and type-graphql for schema

- nodemailer for forget password

- typeorm is TypeScript ORM for Node.js based on Data Mapper, Unit of Work and Identity Map patterns

- argon2 for hashing passwords, which has a better algo for securing passwords than bcrypt, why it is better [Argon2 vs bycrpt](https://security.stackexchange.com/questions/193351/in-2018-what-is-the-recommended-hash-to-store-passwords-bcrypt-scrypt-argon2), and here are the [docs](https://github.com/ranisalt/node-argon2#readme)

- express session to store cookie on the user's browser for session authentication, [documentation](https://github.com/expressjs/session#readme), data is going to be stored in a redis database becuase its very fast and becuase we need to get the cookie and check if the user is logged in on every request. [docs for connecting redis for session auth](https://github.com/tj/connect-redis)

- postgres and redis for DB

# How to set up dev env

1. start redis server and postgres server [redis](https://tableplus.com/blog/2018/10/how-to-start-stop-restart-redis.html)

1. yarn dev2 (ts-node) (slower,not being used)

- I wanted to get as close to production in dev so i did not use this command, but you can use it if you like. Ts-node takes time because it first has to complie the TS code into JS and then execute the JS code

1. yarn dev (faster, used this instead)

- requires yarn watch to be running in another terminal, this method is much faster. Executes the JS code inside the dist folder.

1. yarn watch

- takes typescript code and turns it into javascript with recompiling. Run this in a seperate terminal and then execute either of the start scripts from above.

# Mikro ORM

## description

First create the models, then use script to create migrations.

## scripts

- yarn create:migration

creates migrations

# How to create new tables in database

1. Create an entity
2. add entity to mikro-orm.config
3. create a resolver
4. add resolver to index.ts
5. test if table is created by using graphql playground
6. go to localhost:4000/graphql for local testing

# trouble shooting

- if cookies are not being set in your graphql playground check the settings. Make sure request.credentials is set to 'include'

# How auth is working (behind the scenes)

1.

- req.session.userID = user.id inside users resolvers, data is being stored in the session ( we are storing the id becuase the id on a user should never change.)
- then the userid --> gets sent to redis
- redis is a key value store
- in our case the key will look something like this session: fdfjsdlfjsdifos --- with a value of {userID: 1}

2.

- the express session will then set a cookie on our browser that looks like fisdljfkldsjfklsdjfkd
- the cookie is a signed version of our redis key

3.

- when a user makes a request then the cookie on the browser (signed version of the key) will be sent to the server

4.

- on the server the cookie gets unsigned/decrypted and then makes a request to redis. It'll look up the key in redis and get the data.

# to build custom queries if persist and flush does not work

- use mikroOrm/ postgres package

- here is an example

```ts
import { EntityManager } from "@mikro-orm/postgresql";

const [user] = await (em as EntityManager)
  .createQueryBuilder(User)
  .getKnexQuery()
  .insert({
    username: options.username,
    password: hashedPassword,
    created_at: new Date(),
    updated_at: new Date(),
  })
  .returning("*");
```
