const express = require('express');
const bodyParser = require('body-parser');
const { config } = require('./config/index');
const categoriesApi = require('./api/components/categories/network')


const app = express();

app.use(bodyParser.json()); // Para datos tipo application/json

//Routes categories
categoriesApi(app);

app.listen(config.port, function () {
  console.log(`App listening on the http://localhost:${config.port}`);
});
