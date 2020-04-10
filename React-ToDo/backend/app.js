const express = require('express');
const bodyParser = require('body-parser');

const api = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use('/todo-history', api);

const port = 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
