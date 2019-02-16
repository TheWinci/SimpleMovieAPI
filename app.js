const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const app = express();
const mongoose = require("mongoose");


const DB_USER = "pawel";
const DB_PASSWORD = "netguru_movies1";

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds123584.mlab.com:23584/simple_movie_api`, { useNewUrlParser: true });

app.use( bodyParser.json() );
app.use('/api', api);

app.listen(process.env.PORT || 8080, function() {
    console.log(`server listening at ${process.env.PORT}`);
});

module.exports = app;