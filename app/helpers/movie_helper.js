
const movies = require('../db/models/movies');

const hasTitle = async (request) => {
    return (request.body.title == null || request.body.title.trim() == '') ? false : true;
};

const doesMovieExists = async (id) => {
    return (await movies.get(id)) ? true : false;
}

const hasId = async (request) => {
    return (request.body.id == null
            || request.body.id.trim() == '') ? false : true;
};

module.exports = {
    hasId: hasId,
    hasTitle: hasTitle,
    doesExists: doesMovieExists
};