const express = require('express');
const bodyParser = require('body-parser');
const { config } = require('./config/index');

const swaggerUi = require('swagger-ui-express');

const swaggerDoc = require('./swagger.json');
const categoriesApi = require('./api/components/categories/network')
const subcategoriesApi = require('./api/components/subcategories/network');

const app = express();

app.use(bodyParser.json()); // Para datos tipo application/json


//Route documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
//Routes
categoriesApi(app);
subcategoriesApi(app);

app.listen(config.port, function () {
  console.log(`App listening on the http://localhost:${config.port}`);
});
