# Serverless Demo

This is a demo GraphQL API using the 
[Serverless framework](https://serverless.com/framework/), Node.js and 
[Amazon RDS](https://aws.amazon.com/rds/).

This project uses Aurora MySQL Serverless

## Getting Started

This is a GraphQL API with the following schema.

```
type Mutation {
  createUser(input: UserInput!): User
}

type Post {
  UUID: String
  Text: String
}

input PostInput {
  Text: String
}

type Query {
  getUser(uuid: String!): User
}

type User {
  UUID: String
  Name: String
  Posts: [Post]
}

input UserInput {
  Name: String
  Posts: [PostInput]
}
```

It has one Query and one Mutation

```
createUser(
  input: UserInput!
): User

getUser(
  uuid: String!
): User
```

### Prerequisites

* An AWS account
* [AWS CLI](https://aws.amazon.com/cli/) installed locally.
* API credentials for your AWS account configured in your AWS CLI locally by running `aws configure`.
* Serverless framework installed locally via `npm -g install serverless`.

### Install

* Install NPM Dependencies by running `npm install`
* Copy `.env.example` to `.env.development` and set the required environmental variables
  * `AURORA_HOST` set to your local mysql host 
  * `DB_NAME`
  * `USERNAME`
  * `PASSWORD` 

### Running locally

Execute `npm run offline`. 
Head over http://localhost:3000 to access the GraphQL playground.

### Steps to Deploy

* Create your `.env.production` file.
* Run `NODE_ENV=production serverless deploy`

### Steps to Remove All Resources

* Create your `.env.production` file.
* Run `NODE_ENV=production serverless remove`
