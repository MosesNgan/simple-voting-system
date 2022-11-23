# Simple Voting System

## :clipboard: Initial Setup

1. Ensure you have [Node.js](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.
2. In the terminal, run: `npm install`

### Setup Postgresql

**Make sure you are at the root folder of the project.**

1. On Mac, you can install it via brew. In the terminal run `brew install postgresql`.
2. Then start the posgresql, run: `brew services start postgresql`.
3. Create the databases for local development and testing env, run `npm run createdb`.
4. Create tables in the databases, run: `npm run migarate`.
5. Create seed data, run: `npm run seed`.

## :computer: Running the Project

1. In the terminal, run: `npm run deploy`
2. Browse to the frontend at [localhost:8000](http://localhost:8000) and try voting!

## :whale: Docker

1. Ensure you have the latest version of Docker installed
2. Run `docker build -t simple-voting-system .`
3. Run `docker run -it -p 8000:8000 simple-voting-system`

If you see this error
```
Docker: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: .....
```
try run `sudo chmod 666 /var/run/docker.sock`

reference: https://stackoverflow.com/a/51362528

## :memo: Running the Tests

To run any automated tests, run `npm test`. This will:
* Run all the client-side tests: `npm test --prefix client`
* Run all the server-side tests: `npm test --prefix server`