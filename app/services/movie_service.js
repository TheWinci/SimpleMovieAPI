
const request = require('request-promise');
const movies = require('../db/models/movies');

const _API_KEY = 'fb23be02';
const _BASE_GET_URL = `http://www.omdbapi.com/?apikey=${_API_KEY}&`;

const validatePostRequest = async (req) => {
    return (req.body.title == null || req.body.title == '') ? false : true;
};

const requestHasId = async (req) => {
    return (req.body.id != null) ? true : false;
};

const getNewMovie = async (title) => {
    var options = {
        uri: `${_BASE_GET_URL}t=${title}`,
        headers: { 'User-Agent': 'Request-Promise' },
        json: true
    };
    let data = await request(options);
    return await movies.add(data);
};

const getAllMovies = async () => {
    return await movies.list();
};

const getMovieById = async (movieId) => {
    return await movies.get(movieId);
};

module.exports = {
    isPostValid: validatePostRequest,
    hasId: requestHasId,
    add: getNewMovie,
    list: getAllMovies,
    get: getMovieById
}