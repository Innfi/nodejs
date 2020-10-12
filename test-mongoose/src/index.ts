import express from 'express';
import mongoose from 'mongoose';


const app = express();
app.use(express.json());

mongoose
    .connect('mongodb://localhost/testdb', { useNewUrlParser: true })
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err));

app.listen(3000);
 