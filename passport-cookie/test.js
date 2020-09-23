const assert = require('assert');
const requst = require('supertest');
const express = require('express');
const { request } = require('http');


const app = express();
app.get('/user', (req, res) => res.send('test'));

describe('api test', () => {
    it('dummy app', () => {
        request(app)
        .get('/user')
        .expect(200);
    });
});