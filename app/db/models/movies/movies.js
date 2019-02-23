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

const addMovie = async (movieData) => {
    var movie = new Movie(movieData);
    return await movie.save();
}

const getMovie = async (id) => {
    return await Movie.findById(id);
}

const listMovies = async () => {
    return await Movie.find({});
}

module.exports = {
    add: addMovie,
    get: getMovie,
    list: listMovies
};