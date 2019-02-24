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
    return await (new Movie(movieData)).save();
}

const getMovie = async (id) => {
    return await Movie.findById(id);
}

const listMovies = async () => {
    return await Movie.find({});
}

const isDuplicate = async (imdbIDToCheck) => {
    return (await Movie.countDocuments({ imdbID: imdbIDToCheck})) ? true : false;
}

module.exports = {
    add: addMovie,
    get: getMovie,
    list: listMovies,
    isDuplicate: isDuplicate
};