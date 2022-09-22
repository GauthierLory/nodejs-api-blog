# About the project
NodeJs-api-blog is a project to discover the world of api in Node.js. It is mainly a project to learn Node.js, Express.js, Joi for validation, PostgreSQL and more recently prisma (orm). This project uses the Data Mapper pattern, Sqitch for the database and a router.

# Getting Started
## Prerequisites
You must have Node.js and PostgreSQL and Sqitch installed if you want to run the application locally, and you will need to create a postgre user and a database.

Node.Js  **v14.15.1**

This is an example of how to list things you need to use the software and how to install them.

1. Install sqitch (on ubuntu 18.20)
```bash
apt-get install sqitch libdbd-pg-perl postgresql-client
```

2. Create database
```bash
CREATE ROLE user WITH LOGIN PASSWORD 'password';
CREATE DATABASE ecommerce OWNER 'user';
```

## Installation

1. Clone the project
```bash
git clone https://github.com/GauthierLory/nodejs-api-blog
```
2. install dependencies
```bash
cd ./nodejs-api-blog
npm install
```
3. Configure env

The configuration is in the `root`. Please create your own `.env` file.

You can find an example of a `.env` file in `.env.example`.

4. Deploy migrations from sqitch
```bash
sqitch deploy db:pg://gauthier:bidiboum91@localhost:5432/ecommerce
```
5. Run script database
```bash
  ## import data to database
  node import/import.js
```
5. Launch api
```bash
npm run dev
```
Now you can access it through postman, insomia or others. Or through the the web at typically
```bash
### swagger doc
http://localhost:3000/api-docs/#/
```