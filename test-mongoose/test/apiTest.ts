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
    const dummyName: string = 'innfi';
    const dummyEmail: string = 'innfi@test.com';
    const dummyPw: string = 'p4ssw0rd';

    //it('post /api/users/register', async () => {
    //    request(app)
    //    .post('/api/users/register')
    //    .send({ name: dummyName, email: dummyEmail, password: dummyPw, password2: dummyPw })
    //    .set('Accept', 'application/json')
    //    .expect(200)
    //    .end((err: any, res: request.Response) => {
    //        if(err) {
    //            mongoose.disconnect();
    //            throw err;
    //        }
    //    });
    //});

    it('post /api/users/login', async () => {
        request(app)
        .post('/api/users/login')
        .send({ email: dummyEmail, password: dummyPw })
        .set('Accept', 'application/json')
        .expect(200)
        .end((err: any, res: request.Response) => {
            if(err) {
                mongoose.disconnect();
                throw err;
            }
        });
    });
});