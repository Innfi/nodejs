import React, { useRef, FormEvent } from 'react';
import ReactS3Client from 'react-aws-s3-typescript';
import dotenv from 'dotenv';


dotenv.config();

export type UploadResponse = {
  bucket: string;
  key: string;
  location: string;
  status: number;
};

export const UploadForm = () => {
  console.log(`access key id: ${process.env.REACT_APP_AKID}`);
  console.log(`secret key: ${process.env.REACT_APP_SECRET_KEY}`);

  const fileRef = useRef<HTMLInputElement & File>(null);

  const uploadFileToS3 = () => {
    const s3Config = {
      bucketName: 'pics', 
      region: 'ap-northeast-2',
      accessKeyId: '',
      secretAccessKey: '',
    };
    const s3Client = new ReactS3Client(s3Config);
    const file = fileRef.current;
    s3Client.uploadFile(file as File);
    // .then((value: UploadResponse) => {

    // });
  };

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    console.log('handleClick called');
    uploadFileToS3();
  };

  return (
    <div>
      <form onSubmit={(e: FormEvent) => handleClick(e)}>
        <label>
          image: 
          <input type="file" ref={fileRef} />
        </label>
        <button type="submit">upload</button>
      </form>
    </div>
  );
};