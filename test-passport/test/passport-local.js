const request = require('supertest');
const assert = require('assert');
const express = require('express');
const passport = require('passport');
const passportLocal = require('passport-local');
const flash = require('connect-flash');


const app = express();
app.use(passport.initialize());
app.use(express.json());
app.use(flash());

passport.use('local', new passportLocal.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {
    if(username !== 'innfi') return done(null, false);
    if(password !== '1234') return done(null, false);

    return done(null, {
        username: 'innfi', 
        email: 'innfi@test.com'
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

app.post('/login', 
    passport.authenticate('local', { failureFlash: true }), 
    function(req, res) {
        res.send({
            message: 'success'
        });
    }
);


describe('PassportLocal', () => {
    it('authenticate success', (done) => {
        request(app)
        .post('/login')
        .send({username: 'innfi', password: '1234'})
        .expect(200)
        .end((err, result) => {
            assert.strictEqual(result.body.message, 'success');
            done();
        });
    });

    it('authenticate fail', (done) => {
        request(app)
        .post('/login')
        .send({username: 'innfi', password: 'invalild'})
        .expect(401)
        .end((err, result) => {
            done();
        });
    });
});