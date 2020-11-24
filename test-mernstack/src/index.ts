import express from 'express';
import mongoose from 'mongoose';
import passportStatic from './passport';
import userRouter from './routes/users';


const app = express();
app.use(express.json());
app.use(passportStatic.initialize());
app.use('/api/users', userRouter);

mongoose
    .connect('mongodb://localhost/testdb', { useNewUrlParser: true })
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err));

app.listen(3000);
 