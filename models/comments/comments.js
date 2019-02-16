const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    movie_id: String,
    text: String
});

var Comment = mongoose.model("Comment", schema);

function getComments(movie_id, cb) {

    Comment.where('movie_id').equals(movie_id).exec(function(err, comments) {

        if(err) {
            cb(err);
        } else {
            cb(null, comments);
        }

    });

}

function addComment(commentData, cb) {

    var comment = new Comment(commentData);

    comment.save(function(err, comment) {

        if(err) {
            cb(err);
        } else {
            cb(null, comment);
        }

    });

}

function listComments(cb) {

    Comment.find({}).exec(function(err, comment) {

        if(err) {
            cb(err);
        } else {
            cb(null, comment);
        }

    });

}

module.exports = {
    add: addComment,
    get: getComments,
    list: listComments
};