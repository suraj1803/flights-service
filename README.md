# Welcome to Flights Service

## Project Setup

- clone the project on your local
- Execute `npm install` in the root directory
- Create a `.env` file in the root directory and add the following enviroment variables

  - `PORT=3000`
  - `DB_URL=<your database url that is supported by drizzle>` [More info about Drizzle](https://orm.drizzle.team/docs/get-started)
  - Change the `drizzle.config.ts` to use postgress or other databases

- Once you've added your db config as listed above, in root directory execute `npx drizzle-kit push` to sync the orm and original database

## DB Design

- Airplane table
- Flight
- Airport
- City
