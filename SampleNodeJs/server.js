'use strict';

var path = require('path');
var express = require('express');

var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

app.set('port', 1337);

var server = app.listen(app.get('port'), function () {
    console.log('listening');
});