const app = require('express')();

app.get('/', (req, res) => {
    res.send({message: 'server is up'});
});

app.use('/movies', require('./movies_route'));
app.use('/comments', require('./comments_route'));

app.all('*', (req, res) => {
    res.status(404).send({message: 'not found'});
});

module.exports = app;