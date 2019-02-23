const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    movie_id: String,
    text: String
});

var Comment = mongoose.model("Comment", schema);

const getComments = async (movie_id) => {
    return await Comment.where('movie_id').equals(movie_id);
}

const addComment = async (commentData) => {
    var comment = new Comment(commentData);
    return await comment.save();
}

const listComments = async () => {
    return await Comment.find({});
}

module.exports = {
    add: addComment,
    get: getComments,
    list: listComments
};