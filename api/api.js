const express = require('express');
const request = require('request');
const movies = require('../models/movies');

const router = express.Router();

const _API_KEY = 'fb23be02';
const _BASE_GET_URL = `http://www.omdbapi.com/?apikey=${_API_KEY}&`;
const _BASE_POSTER_URL = `http://img.omdbapi.com/?apikey=${_API_KEY}&`;

router.post("/movies", function (req, res) {
    if (req.body.title == null || req.body.title == '') {
        res.send('no title specified');
        return;
    }
    request.get(`${_BASE_GET_URL}t=${req.body.title}`, function (error, response, body) {
        if (error) {
            res.json(error);
            return;
        }
        var jsonBody = JSON.parse(body);
        if (jsonBody.Response == 'False') {
            res.send(`Sorry, could not find a movie with title \"${req.body.title}\"`);
            return;
        }
        movies.add(jsonBody, function (err, data) {
            if (err) {
                res.status(404);
                res.json({
                    error: "Movie not created"
                });
            } else {
                res.json(data);
            }
        });
    })
});

router.get("/movies", function (req, res) {
    if(req.body.id != null){
        movies.get(req.body.id, function(err,data){
            if(err) {
                res.status(404);
                res.json({
                    error: "Movie not found"
                });
            } else {
                res.json(data);
            }
        })
        return;
    }
    movies.list(function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: "Movies not found"
            });
        } else {
            res.json(data);
        }
    });
});

router.post("/comments", function (req, res) {
    res.json(req.body);
});

router.get("/comments", function (req, res) {
    res.json(req.body);
});

module.exports = router;