import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import path from 'path';


AWS.config.update({
    region: 'ap-northeast-2',
    credentials: new AWS.Credentials({
        accessKeyId: process.env.AKID!,
        secretAccessKey: process.env.SECRET!
    })
});

const keyFunction = (
    req: Express.Request, 
    file: Express.Multer.File, 
    callback: (error: any, key?: string | undefined) => void
): void => {
    const extension = path.extname(file.originalname);
    callback(null, `userImage/${extension}`);
};

export const s3Upload = (bucketName: string): multer.Multer => {
    //const bucketName = 'image-storage';

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