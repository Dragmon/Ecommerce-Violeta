const express = require('express');
const Controller = require('./index');
function categoriesApi(app) {
  const router = express.Router();

  app.use('/api/categories', router);
  router.get('/', async function (req, res, next) {
    try {
      const categories = await Controller.getAll();
      res.status(200).json({
        data: categories,
        message: 'categories listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:Id_Category', async function (req, res, next) {
    try {
      const categories = await Controller.findId(req.params.Id_Category);
      res.status(200).json({
        data: categories,
        message: 'category retrieve',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function (req, res, next) {
    try {
      const createIdCategory = await Controller.upsert(req.body);
      res.status(200).json({
        data: createIdCategory,
        message: 'category created',
      });
    } catch (error) {
      next(error);
    }
  });
  router.put('/:Id_Category', async function (req, res, next) {
    try {
      const updateIdCategory = await Controller.upsert({
        ...req.body,
        Id_Category: req.params.Id_Category,
      });
      res.status(200).json({
        data: updateIdCategory,
        message: 'category updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:Id_Category', async function (req, res, next) {
    try {
      const deletedIdCategory = await Controller.remove(req.params.Id_Category);
      res.status(200).json({
        data: deletedIdCategory,
        message: 'categories deleted',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = categoriesApi;
