import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import path from 'path';
import dotenv from 'dotenv';
import { uuid } from 'uuidv4';


dotenv.config();
const accessKeyId: string = process.env.AKID!;
const secretAccessKey: string = process.env.SECRET!;

console.log(`akid: ${accessKeyId}`);
console.log(`secret: ${secretAccessKey}`);

AWS.config.update({
    region: 'ap-northeast-2',
    credentials: new AWS.Credentials({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    })
});

const keyFunction = (
    req: Express.Request, 
    file: Express.Multer.File, 
    callback: (error: any, key?: string | undefined) => void
): void => {
    const filename = file.filename;
    const extension = path.extname(file.originalname);

    const randomName = uuid();
    
    callback(null, `userImage/${randomName}`);
};

export const s3Upload = (bucketName: string): multer.Multer => {
    const multerStorage: multer.StorageEngine = multerS3({
        s3: new AWS.S3({
            apiVersion: '2006-03-01',
            params: { Bucket: bucketName }
        }),
        bucket: bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: keyFunction
    });

    return multer({
        storage: multerStorage,
        limits: { fileSize: 1024*1024*5 }
    });
};