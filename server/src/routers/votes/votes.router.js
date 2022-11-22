const express = require('express');

const {
  createVote,
} = require('./votes.controller');

const votesRouter = express.Router();

votesRouter.post('/', createVote);

module.exports = votesRouter;
