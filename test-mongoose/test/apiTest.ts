import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import passportStatic from '../src/passport';
import userRouter from '../src/routes/users';


const app = express();
app.use(express.json());
app.use(passportStatic.initialize());
app.use('/api/users', userRouter);

mongoose
    .connect('mongodb://localhost/testdb', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err));

describe('api test', () => {
    it('get /', () => {
        request(app)
        .get('/')
        .expect(200)
        .end((err: any, res: request.Response) => {
            if(err) throw err;
        });
    });
});