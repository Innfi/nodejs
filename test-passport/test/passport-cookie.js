const request = require('supertest');
const assert = require('assert');
const express = require('express');
const passport = require('passport');
const passportCookie = require('passport-cookie');
const cookieParser = require('cookie-parser');


const app = express();
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());





describe('PassportCookie', () => {

});