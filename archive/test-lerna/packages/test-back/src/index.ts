import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send({ err: 'ok'});
});

app.listen(3000, () => console.log('listening'));