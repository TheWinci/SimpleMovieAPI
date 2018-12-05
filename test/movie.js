const mongoose = require('mongoose');
const movies = require('../models/movies');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

describe('Movies', () => {
    describe('GET /api/movies', () => {
        it('it should get all movies', (done) => {
            chai.request(server)
            .get('/api/movies')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            });
        });
        it('it should get one movie specified in request', (done) => {
            let movie = {
                id: '5c04394fadb43e2c206038f4'
            };
            chai.request(server)
            .get('/api/movies')
            .send(movie)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body._id.should.be.a('String');
                res.body._id.should.be.eql(movie.id);
            done();
            });
        });
    });
    describe('POST /api/movies', () => {
        it('it should return movie object from omdbapi', (done) => {
            let title = {
                title: 'shawshank'
            }
            chai.request(server)
            .post('/api/movies')
            .send(title)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('Title');
                res.body.Title.should.be.a('String');
                res.body.Title.toLowerCase().should.contain(title.title);
            done();
            });
        });
        it('it should return error as no title has been specified', (done) => {
            chai.request(server)
            .post('/api/movies')
            .end((err,res) => {
                res.should.have.status(400);
                res.body.should.have.property('error');
                res.body.error.should.be.a('String');
            done();
            });
        });
    });
});