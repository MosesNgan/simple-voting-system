const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Simple Voting System works!</h1>');
});

app.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}...`);
});
