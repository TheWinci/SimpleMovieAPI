const app = require('express').Router();
const service = require('../services/movie_service');
const helper = require('../helpers/movie_helper');

app.get('/', async (req, res) => {
    if (await helper.hasId(req)) {
        await service.get(req.body.id).then((data) => {
            res.json(data);
        }).catch(async (err) => {
            res.status(400).json({
                message: err.message
            });
        });
    }
    else{
        await service.list().then((data) => {
            res.json(data);
        }).catch((err) => { 
            res.status(404).json({
                message: 'no movies',
                error: err
            });
        });
    }
});

app.post('/', async (req, res) => {
    if (!await helper.hasTitle(req)) {
        res.status(400).json({
            message: 'no title specified'
        });
        return;
    }
    
    await service.add(req.body.title).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(404).json({
            message: error.message
        });
    });
});

module.exports = app;