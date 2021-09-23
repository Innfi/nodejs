import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    

    res.status(200).send('hello').end();
});

app.post('/', 
    upload.single("file"),
    (req: Request, res: Response) => {

    const file: Express.Multer.File = req.file!;
    console.log(`filename: ${file.originalname}`);
    
    res.status(200).send('post done').end();
});

app.listen(1330, () => {
    console.log('start listening');
});