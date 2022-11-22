# Simple Voting System

## :key: Prerequisites

- Install [Node.js](https://nodejs.org/en/download/)
- Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## :clipboard: Initial Setup

1. Ensure you have Node.js installed.
2. In the terminal, run: `npm install`

## :computer: Running the Project

1. In the terminal, run: `npm run deploy`
2. Browse to the frontend at [localhost:8000](http://localhost:8000) and try voting!

## :whale: Docker

1. Ensure you have the latest version of Docker installed
2. Run `docker build -t simple-voting-system .`
3. Run `docker run -it -p 8000:8000 simple-voting-system`

## :memo: Running the Tests

To run any automated tests, run `npm test`. This will:
* Run all the client-side tests: `npm test --prefix client`
* Run all the server-side tests: `npm test --prefix server`