const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const connectEnsureLogin = require('connect-ensure-login');

const app = express();

app.use(express.static(__dirname));

const bodyParser = require('body-parser');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false, 
    saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
app.use(passport.initialize())
app.use(passport.session());

mongoose.connect('mongodb://localhost/UserLogin',
    { useNewUrlParser: true, useUnifiedTopology: true });

const UserDetail = new mongoose.Schema({
    username: String,
    password: String
});

UserDetail.plugin(passportLocalMongoose);
const userDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

passport.use(userDetails.createStrategy());
passport.serializeUser(userDetails.serializeUser());
passport.deserializeUser(userDetails.deserializeUser());

app.listen(3000, () => console.log('listening - '));


app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if(!user) return res.redirect('/login?info=', + info);

        req.login(user, function(err) {
            if(err) return next(err);
            return res.redirect('/');
        });
    })(req, res, next);
});

app.get('/login',
  (req, res) => res.sendFile('html/login.html',
  { root: __dirname })
);

app.get('/',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.sendFile('html/index.html', {root: __dirname})
);

app.get('/private',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.sendFile('html/private.html', {root: __dirname})
);

app.get('/user',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.send({user: req.user})
);
