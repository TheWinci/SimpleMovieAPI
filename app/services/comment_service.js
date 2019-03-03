
const request = require('request-promise');
const comments = require('../db/models/comments');

const addComment = async (commentData) => {
    return await comments.add(commentData);
};

const listMovieComments = async (movieId) => {

};

const listAllComments = async () => {

};

module.exports = {
    add: addComment,
    getList: listMovieComments,
    getAll: listAllComments
};