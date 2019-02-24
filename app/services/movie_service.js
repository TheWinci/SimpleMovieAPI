
const request = require('request-promise');
const movies = require('../db/models/movies');

const _API_KEY = 'fb23be02';
const _BASE_GET_URL = `http://www.omdbapi.com/?apikey=${_API_KEY}&`;

const getNewMovie = async (title) => {
    try {
        var options = {
            uri: `${_BASE_GET_URL}t=${title}`,
            headers: { 'User-Agent': 'Request-Promise' },
            json: true
        };
        let data = await request(options);
        if (await movies.isDuplicate(data.imdbID)) {
            throw new Error(`Cannot create duplicates`);
        } else {
            return await movies.add(data);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllMovies = async () => {
    try {
        return await movies.list();
    } catch (error) {
        throw new Error('No movies found');
    }
};

const getMovieById = async (movieId) => {
    try {
        return await movies.get(movieId);
    } catch (error) {
        throw new Error(`No movies found with id: ${movieId}`);
    }
};

module.exports = {
    add: getNewMovie,
    list: getAllMovies,
    get: getMovieById
}