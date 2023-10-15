import express from 'express';
import UserManager from '../UserManager';
import { MockUserRepository } from '../persistence/MockUserRepostory';

const userRouter = express.Router();

userRouter.get('/:userId', (req: express.Request, res: express.Response) => {
    res.status(200).send('ok').end();
    //const userId = req.params.userId;

    //try {
    //    const manager = new UserManager(new MockUserRepository());
    //    manager.loadUser(userId)
    //    .then((user) => {
    //        res.send(user);
    //    });
    //} catch(e) {
    //    console.log(e);
    //    res.status(400).send('error from GET');
    //} finally {
    //    res.status(500).send('server unavailable');
    //}
});

userRouter.put('/:userId', (req: express.Request, res: express.Response) => {
    console.log('PUT /users/', req.params.userId);

    try {
        const manager = new UserManager(new MockUserRepository());
        manager.createUser(req.params.userId)
        .then(user => {
            res.send(user);
        });
    } catch(e) {
        console.log(e);
        res.status(400).send('error from PUT');
    } finally {
        res.status(500).send('server unavailable');
    }
});

export default userRouter;
