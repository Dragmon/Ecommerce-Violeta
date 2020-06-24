const express = require('express');
const { api } = require('./config/index');

const swaggerUi = require('swagger-ui-express');

const swaggerDoc = require('./swagger.json');
const categoriesApi = require('./api/components/categories/network')
const subcategoriesApi = require('./api/components/subcategories/network');
const countriesApi = require('./api/components/countries/network');
const stateApi = require('./api/components/states/network');
const citiesApi = require('./api/components/cities/network');
const productsApi = require('./api/components/products/network');


const app = express();

app.use(express.json()); // Para datos tipo application/json


//Route documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
//Routes
categoriesApi(app);
subcategoriesApi(app);
countriesApi(app);
stateApi(app);
citiesApi(app);
productsApi(app);

app.listen(api.port, function () {
  console.log(`App listening on the http://localhost:${api.port}`);
});
