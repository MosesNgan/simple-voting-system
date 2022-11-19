const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Simple Voting System works!</h1>');
});

module.exports = app;