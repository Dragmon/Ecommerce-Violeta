const express = require('express');
const Controller = require('./index');
function citiesApi(app) {
  const router = express.Router();

  app.use('/api/cities', router);

  router.get('/', async function (req, res, next) {
    try {
      const data = await Controller.getAll();
      res.status(200).json({
        data: data,
        message: 'cities listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:Id_City', async function (req, res, next) {
    try {
      const data = await Controller.findId(req.params.Id_City);
      res.status(200).json({
        data: data,
        message: 'state retrieve',
      });
    } catch (error) {
      next(error);
    }
  });
  router.get('/state/:Id_State', async function (req, res, next) {
    try {
      const data = await Controller.findByIdState(
        req.params.Id_State
      );
      res.status(200).json({
        data: data,
        message: 'cities retrieve',
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
        message: 'city created',
      });
    } catch (error) {
      next(error);
    }
  });
  router.put('/:Id_City', async function (req, res, next) {
    try {
      const updateId = await Controller.upsert({
        ...req.body,
        Id_City: req.params.Id_City,
      });
      res.status(200).json({
        data: updateId,
        message: 'city updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:Id_City', async function (req, res, next) {
    try {
      const deletedId = await Controller.remove(
        req.params.Id_City
      );
      res.status(200).json({
        data: deletedId,
        message: 'city deleted',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = citiesApi;
