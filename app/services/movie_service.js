
const request = require('request-promise');
const movies = require('../db/models/movies');

const _API_KEY = 'fb23be02';
const _BASE_GET_URL = `http://www.omdbapi.com/?apikey=${_API_KEY}&`;

const getNewMovie = async (title) => {
    var options = {
        uri: `${_BASE_GET_URL}t=${title}`,
        headers: { 'User-Agent': 'Request-Promise' },
        json: true
    };
    let data = await request(options);
    await movies.isDuplicate(data.imdbID).catch((error) => {
        throw error;
    });
    await movies.add(data).then((result) => {
        return result;
    }).catch((error) => {
        throw error;
    });
};

const getAllMovies = async () => {
    await movies.list().then((result) => {
        return result;
    }).catch((error) => {
        throw error;
    });
};

const getMovieById = async (movieId) => {
    await movies.get(movieId).then((result) => {
        return result;
    }).catch((error) => {
        throw error;
    });
};

module.exports = {
    add: getNewMovie,
    list: getAllMovies,
    get: getMovieById
}