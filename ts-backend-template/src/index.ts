import express from 'express';
import userRouter from './route/UserRouter';

class MainClass {
    private name: String = "Entry Class";
    private express: any;
    private port: number = 3000;

    constructor() {
        this.express = express();
        this.express.use('/users', userRouter);

        this.express.listen(this.port, () => {
            console.log(this.name, 'listening on port', this.port);
        });
    }

    run(): void {
        this.express.get('/', (req: express.Request, res: express.Response) => {
            res.send('text response');
        });
    }
}

const mainEntry = new MainClass();

mainEntry.run();
