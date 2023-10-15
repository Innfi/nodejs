import express from 'express';
import fs from 'fs';
import https from 'https';
import userRouter from './route/UserRouter';
import todoRouter from './route/TodoRouter';


const credentials: object = {
    key: fs.readFileSync(__dirname + '\\cert\\server.key'),
    cert: fs.readFileSync(__dirname + '\\cert\\server.cert')
};

const app = express();
app.use('/users', userRouter);
app.use('/todo', todoRouter);

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('text response').end();
});

https
.createServer(credentials, app)
.listen(8080, () => {
    console.log('listening on port 8080');
});

//class MainClass {
//    private name: String = "Entry Class";
//    private express: any;
//    private port: number = 3000;
//
//    constructor() {
//        this.express = express();
//        this.express.use('/users', userRouter);
//        this.express.use('/todo', todoRouter);
//
//        this.express.listen(this.port, () => {
//            console.log(this.name, 'listening on port', this.port);
//        });
//    }
//
//    run(): void {
//        this.express.get('/', (req: express.Request, res: express.Response) => {
//            res.send('text response');
//        });
//    }
//}
//
//const mainEntry = new MainClass();
//
//mainEntry.run();
