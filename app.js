const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const app = express();

app.use( bodyParser.json() );
app.use('/api', api);

app.listen(8080, function() {
    console.log("server started at http://localhost:8080");
});