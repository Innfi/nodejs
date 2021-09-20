import React, { useRef, FormEvent } from 'react';
import ReactS3Client from 'react-aws-s3-typescript';


export const UploadForm = () => {
	const fileRef = useRef();

	const handleClick = (e: FormEvent) => {
		e.preventDefault();
		console.log(`handleClick called`);
		uploadFileToS3();
	};

	const uploadFileToS3 = () => {
		const s3Config = {
			bucketName: 'pics', 
			region: 'ap-northeast-2',
			accessKeyId: '',
			secretAccessKey: ''
		};
		const s3Client = new ReactS3Client(s3Config);
		const file = fileRef.current;
		s3Client.uploadFile(file)
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