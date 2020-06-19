const express = require('express');
const subcategoriesMock = require('../../../utils/mocks/subcategories')

function subcategoriesApi(app) {
    const router = express.Router();

    app.use('/api/subcategories', router);

    router.get('/', async function(req, res, next){
        try {
            const subcategories =  await Promise.resolve(subcategoriesMock);
            res.status(200).json({
                data: subcategories,
                message: 'subcategories listed'
            })
        } catch (error) {
            next(error);
        }
    });

    router.get('/:Id_Category', async function(req, res, next){
        try {
            const subcategories = await Promise.resolve(subcategoriesMock[req.params.Id_Category]);
            res.status(200).json({
                data: subcategories,
                message: 'category retrieve'
            })
        } catch (error) {
            next(error);
        }
    });

    router.post('/', async function(req, res, next){
        try {
            const createIdCategory =  await Promise.resolve(subcategoriesMock[0].Id_Category);
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
            const updateIdCategory =  await Promise.resolve(subcategoriesMock[req.params.Id_Category].Id_Category);
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
            const deletedIdCategory =  await Promise.resolve(subcategoriesMock[req.params.Id_Category].Id_Category);
            res.status(200).json({
                data: deletedIdCategory,
                message: 'subcategories deleted'
            })
        } catch (error) {
            next(error);
        }
    });
}

module.exports = subcategoriesApi;
