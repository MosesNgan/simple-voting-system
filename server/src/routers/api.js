const express = require('express');

const campaignsRouter = require('./campaigns/campaigns.router');
const votesRouter = require('./votes/votes.router');

const api = express.Router();


api.use('/campaigns', campaignsRouter);
api.use('/votes', votesRouter);

api.get('/', (req, res) => {
  res.send('<h1>Simple Voting System works!</h1>');
});

module.exports = api;