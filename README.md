# User Authentication

This project implements custom authentication, demonstrating both session and token based authentication.

## Features

- User interface
- Restful Api
- Session Based authentication
- Token based authentication
- SQLlite Database and Prisma ORM
- Application logging

## How to run API

1. Clone repository and cd into folder

   ```sh
   git clone https:github.com/michealnaita/authentication app && cd ./app
   ```

2. make sure that node and npm are installed on your machine

   ```sh
   node --version
   ```

   or folow installation [guide](https://nodejs.org/en/download/package-manager/)

3. Create the SQL database file and seed data base with default user credentials

   ```sh
    touch ./db/app.db
    npx prisma db seed
   ```

4. Build and Run application

   ```sh
   npm build
   npm start
   ```

5.You can exersice the api using [Postman](https://www.postman.com) or use the UI at localhost:3000

## Routes

- **/**

  - home allowed methods: GET

- **/jwt**

  - GET: protected page
  - POST: token based user validation route

- **/session**

  - GET: protected page
  - POST: session based user validation route

- **/[session | jwt]/login**
  - GET: sign in page
