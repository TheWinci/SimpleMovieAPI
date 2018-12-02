const mongoose = require("mongoose");

const DB_USER = "pawel";
const DB_PASSWORD = "netguru_movies1";

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds123584.mlab.com:23584/simple_movie_api`, { useNewUrlParser: true });

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

    var user = new Movie(movieData);

    user.save(function(err, movie) {

        if(err) {
            cb(err);
        } else {
            cb(null, movie);
        }

    });

}

function getMovie(id, cb) {

    Movie.findById(id).exec(function(err, movie) {

        if(err) {
            cb(err);
        } else {
            cb(null, movie);
        }

    });

}


function listMovies(cb) {

    Movie.find({}).exec(function(err, movies) {

        if(err) {
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