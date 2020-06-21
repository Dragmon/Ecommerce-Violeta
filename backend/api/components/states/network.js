const express = require('express');
const Controller = require('./index');
function statesApi(app) {
  const router = express.Router();

  app.use('/api/states', router);

  router.get('/', async function (req, res, next) {
    try {
      const data = await Controller.getAll();
      res.status(200).json({
        data: data,
        message: 'states listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:Id_State', async function (req, res, next) {
    try {
      const data = await Controller.findId(req.params.Id_State);
      res.status(200).json({
        data: data,
        message: 'state retrieve',
      });
    } catch (error) {
      next(error);
    }
  });
  router.get('/country/:Id_Country', async function (req, res, next) {
    try {
      const data = await Controller.findByIdCountry(
        req.params.Id_Country
      );
      res.status(200).json({
        data: data,
        message: 'states retrieve',
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
        message: 'state created',
      });
    } catch (error) {
      next(error);
    }
  });
  router.put('/:Id_State', async function (req, res, next) {
    try {
      const updateId = await Controller.upsert({
        ...req.body,
        Id_State: req.params.Id_State,
      });
      res.status(200).json({
        data: updateId,
        message: 'state updated',
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:Id_State', async function (req, res, next) {
    try {
      const deletedId = await Controller.remove(
        req.params.Id_State
      );
      res.status(200).json({
        data: deletedId,
        message: 'state deleted',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = statesApi;
