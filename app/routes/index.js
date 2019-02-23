const app = require('express')();

app.get('/', (req, res) => {
    res.send({message: 'server is up'});
});

app.use('/movies', require('./movies'));
app.use('/comments', require('./comments'));

app.all('*', (req, res) => {
    res.status(404).send({message: 'not found'});
});

module.exports = app;