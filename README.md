# technologies

- express server because of the high quality middleware

- apollo server that allows us to create graphql endpoints

- graphql and type-graphql for schema

- MikroOrm is TypeScript ORM for Node.js based on Data Mapper, Unit of Work and Identity Map patterns

# How to set up dev env

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
