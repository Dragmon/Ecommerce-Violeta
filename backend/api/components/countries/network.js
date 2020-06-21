const express = require('express');
const Controller = require('./index');
function countriesApi(app) {
  const router = express.Router();

  app.use('/api/countries', router);
  router.get('/', async function (req, res, next) {
    try {
      const data = await Controller.getAll();
      res.status(200).json({
        data: data,
        message: 'countries listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:Id_Country', async function (req, res, next) {
    try {
      const data = await Controller.findId(req.params.Id_Country);
      res.status(200).json({
        data: data,
        message: 'country retrieve',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function (req, res, next) {
    try {
      const createdId = await Controller.upsert(req.body);
      res.status(200).json({
        data: createdId,
        message: 'country created',
      });
    } catch (error) {
      next(error);
    }
  });
  router.put('/:Id_Country', async function (req, res, next) {
    try {
      const updateId = await Controller.upsert({
        ...req.body,
        Id_Country: req.params.Id_Country,
      });
      res.status(200).json({
        data: updateId,
        message: 'country updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:Id_Country', async function (req, res, next) {
    try {
      const deletedId = await Controller.remove(req.params.Id_Country);
      res.status(200).json({
        data: deletedId,
        message: 'countries deleted',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = countriesApi;
