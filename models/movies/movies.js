const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    Title: String,
    Year: Number,
    Rated: String,
    Released: Date,
    Runtime: String,
    Plot: String,
    imdbID: String
});

var Movie = mongoose.model("Movie", schema);

function addMovie(movieData, cb) {
    var movie = new Movie(movieData);
    movie.save(function (err, movie) {
        if (err) {
            cb(err);
        } else {
            cb(null, movie);
        }
    });
}

function getMovie(id, cb) {
    Movie.findById(id).exec(function (err, movie) {
        if (err) {
            cb(err);
        } else {
            cb(null, movie);
        }
    });
}

function listMovies(cb) {
    Movie.find({}).exec(function (err, movies) {
        if (err) {
            cb(err);
        } else {
            cb(null, movies);
        }
    });
}

module.exports = {
    add: addMovie,
    get: getMovie,
    list: listMovies
};