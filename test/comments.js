const mongoose = require('mongoose');
const comments = require('../models/comments');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

describe('Comments', () => {
    describe('GET /api/comments', () => {
        it('it should get all the comments', (done) => {
            chai.request(server)
            .get('/api/comments')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            });
        });
        it('it should get all the comments for a specified movie id', (done) => {
            let movieID = {
                movie_id: "5c081e714d170c0d440a3d54"
            };
            chai.request(server)
            .get('/api/comments')
            .send(movieID)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            });
        });
    });
    describe('POST /api/comments', () => {
        it('it should add new comment to db', (done) => {
            let comment = {
                movie_id: "5c081e714d170c0d440a3d54",
                text: "test comment inside of tests"
            };
            chai.request(server)
            .post('/api/comments')
            .send(comment)
            .end((err,res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('text').eql(comment.text);
                res.body.should.have.property('movie_id');
                res.body.should.have.property('_id');
            done();
            });
        });
        it('it should return error as no text was specified', (done) => {
            let comment = {
                movie_id: "5c081e714d170c0d440a3d54",
                text: ""
            };
            chai.request(server)
            .post('/api/comments')
            .send(comment)
            .end((err,res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
            done();
            });
        });
        it('it should return error as no movie id was specified', (done) => {
            let comment = {
                movie_id: "",
                text: "test comment inside of tests"
            };
            chai.request(server)
            .post('/api/comments')
            .send(comment)
            .end((err,res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
            done();
            });
        });
    });
});