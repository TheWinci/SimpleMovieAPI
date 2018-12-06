const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const app = express();

app.use( bodyParser.json() );
app.use('/api', api);

app.listen(process.env.PORT || 8080, function() {
    console.log(`server listening at ${process.env.PORT}`);
});

module.exports = app;