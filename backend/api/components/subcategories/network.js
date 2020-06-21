const express = require('express');
const Controller = require('./index');
function subcategoriesApi(app) {
  const router = express.Router();

  app.use('/api/subcategories', router);

  router.get('/', async function (req, res, next) {
    try {
      const subcategories = await Controller.getAll();
      res.status(200).json({
        data: subcategories,
        message: 'subcategories listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:Id_Subcategory', async function (req, res, next) {
    try {
      const subcategories = await Controller.findId(req.params.Id_Subcategory);
      res.status(200).json({
        data: subcategories,
        message: 'subcategory retrieve',
      });
    } catch (error) {
      next(error);
    }
  });
  router.get('/category/:Id_IdCategory', async function (req, res, next) {
    try {
      const subcategories = await Controller.findByIdCategory(
        req.params.Id_IdCategory
      );
      res.status(200).json({
        data: subcategories,
        message: 'subcategory retrieve',
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
        message: 'subcategory created',
      });
    } catch (error) {
      next(error);
    }
  });
  router.put('/:Id_Subcategory', async function (req, res, next) {
    try {
      const updateIdCategory = await Controller.upsert({
        ...req.body,
        Id_Subcategory: req.params.Id_Subcategory,
      });
      res.status(200).json({
        data: updateIdCategory,
        message: 'subcategory updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:Id_Subcategory', async function (req, res, next) {
    try {
      const deletedIdCategory = await Controller.remove(
        req.params.Id_Subcategory
      );
      res.status(200).json({
        data: deletedIdCategory,
        message: 'subcategory deleted',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = subcategoriesApi;
