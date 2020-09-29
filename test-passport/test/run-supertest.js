const request = require('supertest');
const express = require('express');
const assert = require('assert');


const app = express();
app.use(express.json());
app.get('/user', (req, res) => res.send('test'));
app.post('/user', (req, res) => {
    if(req.body.name !== 'innfi') res.send(400);

    res.send({
        email: 'innfi@test.com'
    });
});

describe('supertest', () => {
    it('dummy app', (done) => {
        request(app)
        .get('/user')
        .expect(200)
        .end(() => {
            done();
        });
    });

    it('invalid path', (done) => {
        request(app)
        .get('/notexist')
        .expect(404)
        .end((err, result) => {
            if(err) {
                console.log('err: ', err);
            } 

            done();
        });
    });

    it('post data', (done) => {
        request(app)
        .post('/user')
        .send({name: 'innfi'})
        .expect(200)
        .end((err, res) => {
            assert.strictEqual(res.body.email, 'innfi@test.com');
            done();
        });
    });
});