import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserAdapter from './db';
import { IUserInfo } from './users';

interface JwtData {
    email: string,
    passwd: string, 
    iat: string
};

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const dummySecret: string = 'dont_try_this_on_prod';

const userAdapter: UserAdapter = new UserAdapter('mongodb://localhost/passdb');
userAdapter.connectToDB()
.then((value: void) => {
    console.log('db connected');
});

passport.use(
    new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
    }, 
    (email: string, passwd: string, done: Function) => {
        userAdapter.loadUser(email)
        .then((user: IUserInfo) => {
            if(!user) return done(null, false, { msg: 'user not found'});
            if(!bcrypt.compare(passwd, user.passwd)) return done(null, false, { msg: 'invalid passwd'});

            const token: string = jwt.sign({ 
                email: user.email,
                passwd: user.passwd
            }, dummySecret);

            return done(null, user, { msg: 'login success', token: token});
        })
        .catch((err: any) => done(err));
    })
);

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: dummySecret
    }, 
    async (jwtToken: JwtData, done: Function) => {
        const user: IUserInfo = await userAdapter.loadUser(jwtToken.email);
        if(user === null) return done(null, false);

        if((user as IUserInfo).passwd != jwtToken.passwd) return done(null, false);

        return done(null, user, jwtToken);
    })
);

passport.serializeUser<any, any>((user, done: Function) => done(null, user));
passport.deserializeUser((user, done: Function) => done(null, user));


const defaultRouter = express.Router();
defaultRouter.get('/', async (req: express.Request, res: express.Response) => {
    res.status(200).send({ msg: 'ok'}).end();
});

defaultRouter.get('/test', passport.authenticate('jwt', { 
        session: false, 
        failureRedirect: '/error'
    }), 
    (req: express.Request, res: express.Response) => {
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

    const createResult: boolean = await userAdapter.createUser(req.body.email, 
        await bcrypt.hash(req.body.passwd, 100));
    if(createResult) res.status(200).send({ msg: 'ok'}).end();
    else return res.status(500).send({ msg: 'duplicate'}).end();
});

defaultRouter.post('/login', passport.authenticate('local', {
        failureRedirect: '/error'
    }), (req: express.Request, res: express.Response) => {
        console.log(req.authInfo);

        res.status(200).send({ auth: req.authInfo}).end();
    }
);

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use('/', defaultRouter);

app.listen(3000, () => {
    console.log('up 3000');
});