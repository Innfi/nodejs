import passport from 'passport';
import passportJwt from 'passport-jwt';
import mongoose from 'mongoose';

const User = mongoose.model('users');

const opts: passportJwt.StrategyOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:  'test-key'
};

const passportStatic =  passport.use(
    new passportJwt.Strategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then(user => {
            if(user) return done(null, user);
            else return done(null, false);
        })
        .catch(err => console.log(err));
    })
);

export default passportStatic;