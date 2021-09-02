import express from 'express';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';


interface UserData {
    userId: string;
    userPass: string;
    role: string;
};

const dummyUser: UserData = {
    userId: 'innfi',
    userPass: 'test',
    role: 'dashboard_admin'
};

passport.use('local', new passportLocal.Strategy({
    usernameField: 'userId',
    passwordField: 'userPass',
    session: true
}, (userId: string, userPass: string, done: Function) => {
    console.log(`verify] userId: ${userId}, userPass: ${userPass}`);
    
    if(userId !== 'innfi') return done({ msg: 'errorMsg' }, false);

    return done(null, dummyUser);
}));

passport.serializeUser((user: Express.User, done: Function) => {
    console.log(`serializeUser] ${JSON.stringify(user)}`);

    done(null, user);
});

passport.deserializeUser((user: UserData, done: Function) => {
    console.log(`deserializeUser] ${JSON.stringify(user)}`);

    done(null, dummyUser);
});

const app = express();
app.use(session({
    secret: 'fixmeee',
    resave: false,
    saveUninitialized: false,
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send({ msg: 'root ok' }).end();
});

app.post('/login', 
    passport.authenticate('local'), 
    (req: express.Request, res: express.Response) => {
        console.log('/login successful');

        res.status(200).send({msg: 'login ok'}).end();
    }
);

app.post('/logout', (req: express.Request, res: express.Response) => {
    req.session?.destroy((err: any) => {});

    res.status(200).send({ msg: 'logout ok'}).end();
});

app.get('/test', (req: express.Request, res: express.Response) => {
    const user = req.user as UserData;
    if(!user) {
        res.status(401).send({err: 'login'}).end();
        return;
    }

    console.log(`userId: ${user.userId}`);
    console.log(`userPass: ${user.userPass}`);

    res.status(200).send({ msg: 'private page ok' });
});

app.listen(3000, () => {
    console.log('listen 3000');
});