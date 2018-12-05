const express = require('express');
const request = require('request');
const movies = require('../models/movies');
const comments = require('../models/comments');

const router = express.Router();

const _API_KEY = 'fb23be02';
const _BASE_GET_URL = `http://www.omdbapi.com/?apikey=${_API_KEY}&`;
const _BASE_POSTER_URL = `http://img.omdbapi.com/?apikey=${_API_KEY}&`;

router.post("/movies", function (req, res) {
    if (req.body.title == null || req.body.title == '') {
        res.status(400);
        res.json({
            error: 'no title specified'
        });
        return;
    }
    request.get(`${_BASE_GET_URL}t=${req.body.title}`, function (error, response, body) {
        if (error) {
            res.json(error);
            return;
        }
        var jsonBody = JSON.parse(body);
        if (jsonBody.Response == 'False') {
            res.status(404);
            res.json({
                error: `Sorry, could not find a movie with title \"${req.body.title}\"`
            });
            return;
        }
        movies.add(jsonBody, function (err, data) {
            if (err) {
                res.status(418);
                res.json({
                    error: "Movie not created"
                });
            } else {
                res.status(201);
                res.json(data);
            }
        });
    })
});

router.get("/movies", function (req, res) {
    if (req.body.id != null) {
        movies.get(req.body.id, function (err, data) {
            if (err) {
                res.status(404);
                res.json({
                    error: "Movie not found"
                });
            } else {
                res.json(data);
            }
        });
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
    if (req.body.movie_id == null || req.body.movie_id == '' || req.body.text == null || req.body.text == '') {
        res.status(400);
        res.json({
            error: 'You need to specify movie id and text to add comment'
        });
        return;
    }

    movies.get(req.body.movie_id, function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: "Movie not found"
            });
            return;
        }
    });

    comments.add(req.body, function (err, data) {
        if (err) {
            res.status(418);
            res.json({
                error: "Comment not created"
            });
            return;
        } else {
            res.status(201);
            res.json(data);
        }
    });
});

router.get("/comments", function (req, res) {
    if (req.body.movie_id == null || req.body.movie_id == '') {
        comments.list(function (err, data) {
            if (err) {
                res.status(404);
                res.json({
                    error: "Comments not found"
                });
                return;
            } else {
                res.status(200);
                res.json(data);
            }
        });
        return;
    }
    movies.get(req.body.movie_id, function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: "Movie not found"
            });
            return;
        }
    });

    comments.get(req.body.movie_id, function (err, data) {
        if (err) {
            res.status(404);
            res.json({
                error: "Comments not found"
            });
            return;
        } else {
            res.status(200);
            res.json(data);
        }
    });
});

module.exports = router;