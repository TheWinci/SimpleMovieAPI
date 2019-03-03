const app = require('express').Router();
const movies = require('../db/models/movies');
const helper = require('../helpers/movie_helper');
const request = require('request-promise');

const _API_KEY = 'fb23be02';
const _BASE_GET_URL = `http://www.omdbapi.com/?apikey=${_API_KEY}&`;

app.get('/', async (req, res) => {
    if (await helper.hasId(req)) {
        await movies.get(req.body.id).then((result) => {
            res.json(result);
        }).catch((error) => {
            res.json({
                error: error.message
            });
        });
    }
    else{
        await movies.list().then((result) => {
            res.json(result);
        }).catch((error) => {
            res.status(418).json({
                error: error.message
            });
        });
    }
});

app.post('/', async (req, res) => {
    if (!await helper.hasTitle(req)) {
        res.status(400).json({
            error: 'no title specified'
        });
        return;
    }
    
    var options = {
        uri: `${_BASE_GET_URL}t=${req.body.title}`,
        headers: { 'User-Agent': 'Request-Promise' },
        json: true
    };
    let data = await request(options).catch((error) => {
        res.status(400).json({
            error: error.message
        });
        BroadcastChannel;
    });

    await movies.isDuplicate(data.imdbID).then(async (isFalse) => {

        await movies.add(data).then((result) => {
            res.json(result);
        }).catch((error) => {
            res.status(400).json({
                error: error.message
            });
        });

    }).catch((error) => {
        res.status(400).json({
            error: error.message
        });
    });
});

module.exports = app;