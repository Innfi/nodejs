const assert = require('assert');
const request = require('supertest');
const express = require('express');


const app = express();
app.get('/user', (req, res) => res.send('test'));

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

    //it('post data', () => {

    //});
});