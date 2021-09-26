import express, { Request, Response } from 'express';
import cors from 'cors';
//import multer from 'multer';
import dotenv from 'dotenv'

import { s3Upload } from './s3Upload';


dotenv.config();

const bucketName: string = process.env.BUCKET_NAME!;

const app = express();
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    

    res.status(200).send('hello').end();
});

app.post('/', 
    s3Upload(bucketName).single("file"),
    (req: Request, res: Response) => {

    const file: Express.Multer.File = req.file!;
    console.log(`filename: ${file.originalname}`);
    
    res.status(200).send('post done').end();
});

app.listen(1330, () => {
    console.log('start listening');
});