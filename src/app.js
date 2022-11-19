const express = require('express');

const campaignsRouter = require('./routers/campaigns/campaigns.router');

const app = express();
app.use(express.json());

app.use('/campaigns', campaignsRouter);

app.get('/', (req, res) => {
  res.send('<h1>Simple Voting System works!</h1>');
});

module.exports = app;
