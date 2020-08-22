import express from 'express';

const userRouter = express.Router();

userRouter.get('/:userId', (req: express.Request, res: express.Response) => {
    console.log('userId: ', req.params.userId);

    res.send('user account response here');
});

userRouter.put('/:userId', (req: express.Request, res: express.Response) => {
    console.log('PUT /users/', req.params.userId);

    const createDate: string = Date.now().toString();
    const createUserResult = {
        userId: req.params.userId,
        cDate: createDate,
    };

    res.send(createUserResult);
});

export default userRouter;
