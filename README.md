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
To perform requests please use endpoint `/users/authenticate`  to get token and then use it in request header as `Authorization: Bearer {token}`



## API endpoints

| Resource      | Description                       |             
|:--------------|:----------------------------------|:------
| `/properties`    | Returns list of properties (external endpoint)
| `/properties/sync`    | Returns list of properties (internals endpoint)
## Possible todos:
- create seed also for policies
- store passwords safely and improve security
- set JWT token expiration time
- write tests!:)