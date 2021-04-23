import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { IUserInfo, UserSchema, connectOptions }  from './users';


const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const dummySecret: string = 'dont_try_this_on_prod';

let model: mongoose.Model<any>;
mongoose.createConnection ('mongodb://localhost/passdb', connectOptions)
.then((connection: mongoose.Connection) => {
    console.log('db connected');
    model = connection.model('testusers', UserSchema);
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
    }, (email: string, passwd: string, done: Function) => {
        return model.findOne({ email: email})
        .then((value: any) => {
            console.log(`after: ${value}`);
            console.log(`after2: ${value._id}`);

            if(!value) return done(null, false, { msg: 'user not found'});

            if(!bcrypt.compare(passwd, value.passwd)) return done(null, false, { msg: 'invalid passwd'});

            const testObject: object = {
                email: value.email,
                passwd: value.passwd
            };

            const token: string = jwt.sign(testObject, dummySecret); //FIXMEEE
            return done(null, value, { msg: 'login success', token: token});
        })
        .catch((err: any) => done(err));
    })
);

passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: dummySecret
    }, 
    (jwtToken: any, done: Function) => {
        model.findOne({ email: jwtToken.username }, (err: any, user: any) => {
            if(err) return done(err, false);
            if (user) return done(null, user, jwtToken);
            return done(null, false);
        });
    }));

passport.serializeUser<any, any>((user, done: Function) => done(null, user));
passport.deserializeUser((user, done: Function) => done(null, user));


const defaultRouter = express.Router();
defaultRouter.get('/', async (req: express.Request, res: express.Response) => {
    res.status(200).send({ msg: 'ok'}).end();
});

defaultRouter.get('/test', (req: express.Request, res: express.Response) => {
    res.status(200).send({ msg: 'success page'}).end();
});

defaultRouter.get('/error', (req: express.Request, res: express.Response) => {
    res.status(200).send({ msg: 'error page'}).end();
});

defaultRouter.post('/create', async (req: express.Request, res: express.Response) => {
    const newUserdata: object = {
        email: req.body.email,
        passwd: await bcrypt.hash(req.body.passwd, 10) //FIXME: salt
    };

    const userData: IUserInfo = await model.findOne({ email: req.body.email });
    if (userData !== null) {
        res.status(500).send({ msg: 'duplicate'}).end();
    } else {
        model.create(newUserdata, (err: any) => {
            if (err) {
                console.log(`err: ${err}`);
                res.status(500).send({ msg: 'server error'}).end();
            } else {
                res.status(200).send({ msg: 'ok'}).end();
            }
        });
    }
});

defaultRouter.post('/login', passport.authenticate('local', {
        failureRedirect: '/error'
    }), (req: express.Request, res: express.Response) => {
        console.log(req.authInfo);

        res.status(200).send({ auth: req.authInfo}).end();
        //res.redirect('/test');
    }
);

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use('/', defaultRouter);

app.listen(3000, () => {
    console.log('up 3000');
});