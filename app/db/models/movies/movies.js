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
    try {
        return await (new Movie(movieData)).save();
    } catch (error) {
        throw error;
    }
}

const movieExists = async (id) => {
    try {
        if (await Movie.countDocuments({_id: id}) == 0) {
            throw new Error(`No movies found with specified id: ${id}`);
        }
        return true;
    } catch (error) {
        throw error;
    }
};

const getMovie = async (id) => {
    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error('Invalid id');
        }
        await movieExists(id); // check if movie exists before finding it
        return await Movie.findById(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const listMovies = async () => {
    try {
        if (await Movie.countDocuments({}) == 0) {
            throw new Error('No movies in database');
        }
        return await Movie.find({});
    } catch (error) {
        throw error;
    }
}

const isDuplicate = async (imdbIDToCheck) => {
    try {
        if (!imdbIDToCheck.match(/^[0-9a-zA-Z]{9}$/)) {
            throw new Error('Invalid imdbId');
        }
        let result = await Movie.countDocuments({ imdbID: imdbIDToCheck});
        if (result > 0) {
            throw new Error('Cannot create duplicates');
        }
        return false;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    add: addMovie,
    get: getMovie,
    list: listMovies,
    isDuplicate: isDuplicate,
    exists: movieExists
};