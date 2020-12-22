# fullstack-template

# yarn dev2 (ts-node) (slower,not being used)

I wanted to get as close to production in dev so i did not use this command, but you can use it if you like. Ts-node takes time because it first has to complie the TS code into JS and then execute the JS code

# yarn dev (faster, used this instead)

requires yarn watch to be running in another terminal, this method is much faster. Executes the JS code inside the dist folder.

# yarn watch

takes typescript code and turns it into javascript with recompiling

# Mikro ORM

## description

is TypeScript ORM for Node.js based on Data Mapper, Unit of Work and Identity Map patterns. First create the models, then use script to create migrations.

## scripts

- npx mikro-orm migration:create

###
