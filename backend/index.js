const express = require('express');
const { config } = require('./config/index');

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(config.port, function () {
  console.log(`App listening on the http://localhost:${config.port}`);
});
