const express = require('express');
const categoriesMock = require('../../../utils/mocks/categories')
const Controller = require('./index');

function categoriesApi(app) {
    const router = express.Router();

    app.use('/api/categories', router);
    router.get('/', async function(req, res, next){
        try {
            const categories = await Controller.getAll({Id_Category:'id', Category:'categoria'});
            res.status(200).json({
                data: categories,
                message: 'categories listed'
            })
        } catch (error) {
            next(error);
        }
    });

    router.get('/:Id_Category', async function(req, res, next){
        try {
            const categories = await Controller.findId(req.params.Id_Category);
            res.status(200).json({
                data: categories,
                message: 'category retrieve'
            })
        } catch (error) {
            next(error);
        }
    });

    router.post('/', async function(req, res, next){
        try {
            const createIdCategory =  await Promise.resolve(categoriesMock[0].Id_Category);
            res.status(200).json({
                data: createIdCategory,
                message: 'category created'
            })
        } catch (error) {
            next(error);
        }
    });
    router.put('/:Id_Category', async function(req, res, next){
        try {
            const updateIdCategory =  await Promise.resolve(categoriesMock[req.params.Id_Category].Id_Category);
            res.status(200).json({
                data: updateIdCategory,
                message: 'category updated'
            })
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:Id_Category', async function(req, res, next){
        try {
            const deletedIdCategory =  await Promise.resolve(categoriesMock[req.params.Id_Category].Id_Category);
            res.status(200).json({
                data: deletedIdCategory,
                message: 'categories deleted'
            })
        } catch (error) {
            next(error);
        }
    });
}

module.exports = categoriesApi;
