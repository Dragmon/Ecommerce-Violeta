const express = require('express');
const Controller = require('./index');
function productsApi(app) {
  const router = express.Router();

  app.use('/api/products', router);
  router.get('/', async function (req, res, next) {
    try {
      const data = await Controller.getAll();
      res.status(200).json({
        data: data,
        message: 'products listed',
      });
    } catch (error) {
      next(error);
    }
    
  });

  router.get('/:Id_Product', async function (req, res, next) {
    try {
      const data = await Controller.findId(req.params.Id_Product);
      res.status(200).json({
        data: data,
        message: 'product retrieve',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function (req, res, next) {
    try {
      const createId = await Controller.upsert(req.body);
      res.status(200).json({
        data: createId,
        message: 'product created',
      });
    } catch (error) {
      next(error);
    }
  });
  router.put('/:Id_Product', async function (req, res, next) {
    try {
      const updateId = await Controller.upsert({
        ...req.body,
        Id_Product: req.params.Id_Product,
      });
      res.status(200).json({
        data: updateId,
        message: 'product updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:Id_Product', async function (req, res, next) {
    try {
      const deletedId = await Controller.remove(req.params.Id_Product);
      res.status(200).json({
        data: deletedId,
        message: 'products deleted',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = productsApi;
