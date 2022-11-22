const express = require('express');
const morgan = require('morgan');

const campaignsRouter = require('./routers/campaigns/campaigns.router');
const votesRouter = require('./routers/votes/votes.router');

const app = express();

app.use(morgan('combined'));

app.use(express.json());

app.use('/campaigns', campaignsRouter);
app.use('/votes', votesRouter);

app.get('/', (req, res) => {
  res.send('<h1>Simple Voting System works!</h1>');
});

module.exports = app;
