# Nodejs api role based auth

## Installation

In order to run project you have to install first nodejs + mongodb

### `npm install`

## Available Scripts

In the project directory, run:

### 1. `start your mongodb`

### 2. `npm start`

Seed data from external api to mongo and runs the api on [http://localhost:4000]

## Flow
To perform requests please use endpoint `/users/authenticate` to get token and then use it in request header as `Authorization: Bearer {token}`

## API endpoints

| Resource      | Description                       | Access permissions            
|:--------------|:----------------------------------|:------
| `/users`      | Returns a list of all users | user, admin
| `/users/authenticate`    | Returns `JWT token` in response object after user provides valid `password` and `email` in request `body` | user, admin
| `/users/:userId`    | Returns `user` informations by `userId` | user, admin
| `/users/:userId/policies`    | Returns user policies by `userId` | admin
| `/policies/:policieId/users`    | Returns `user` that is assigned to specific `policy` | admin

## Possible todos:
- create seed also for policies
- store passwords safely and improve security
- set JWT token expiration time
- write tests!:)