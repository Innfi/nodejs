var request = require('supertest');
var app = require('../index.js');


describe('GET /', () => {
    it('responds with hello world', (done) => {
        request(app)
        .get('/')
        .expect('hello world', done);
    });
});

