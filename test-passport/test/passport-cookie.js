const request = require('supertest');
const assert = require('assert');
const express = require('express');
const passport = require('passport');
const passportCookie = require('passport-cookie');
const cookieParser = require('cookie-parser');
const cookieAuthKey = passportCookie.key();


const app = express();
app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser('cookie-secret-key'));


const dummyUser = {
    username: 'innfi', 
    email: 'innfi@test.com'
};

passport.use(new passportCookie.Strategy(function(token, done) {
    if(token === 'test_token') {
        done(null, dummyUser);
    }

    done(null, null);
}));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

app.post('/register', function(req, res) {
    res.send('success');
});

app.post('/login', function(req, res) {
    res.cookie(cookieAuthKey, 'test_token');
    res.send('success');
});

app.post('/logout', function(req, res) {
    req.logout();
    res.clearCookie(cookieAuthKey);
    res.send('logout');
});

app.get('/profile', passport.authenticate('cookie', {
    session: true
}), function(req, res) {
    res.json(dummyUser);
});

describe('PassportCookie', () => {
    it('login success', () => {
        
    });
});