import React, { useRef, FormEvent } from 'react';


export const UploadForm = () => {
	const fileRef = useRef(null);

	const handleClick = (e: FormEvent) => {
		e.preventDefault();
		console.log(`handleClick called`);
	};

	return (
		<div>
			<form onSubmit={(e: FormEvent) => handleClick(e)}>
				<label>
					image: 
					<input type="image" ref={fileRef} />
				</label>
				<button type="submit">upload</button>
			</form>
		</div>
	);
};