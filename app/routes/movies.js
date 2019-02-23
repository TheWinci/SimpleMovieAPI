const app = require('express').Router();
const service = require('../services/movie_service');

app.get('/', async (req, res) => {
    if (await service.hasId(req)) {
        await service.get(req.body.id).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(404).json({
                message: 'no movie with specified id has been found',
                error: err
            });
        });
    }
    else{
        await service.list().then((data) => {
            res.json(data);
        }).catch((err) => {
            console.log(err);
            res.status(404).json({
                message: 'no movies',
                error: err
            });
        });
    }
});

app.post('/', async (req, res) => {
    if (!await service.isPostValid(req)) {
        res.status(400).json({
            message: 'no title specified'
        });
        return;
    }
    
    await service.add(req.body.title).then((data) => {
        let movieData = data;
        
    }).catch((error) => {
        res.status(404).json({
            message: "no movie found with specified title",
            error: error
        });
    });
});

module.exports = app;