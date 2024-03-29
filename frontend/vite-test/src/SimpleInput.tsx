import { Button, Grid, Pagination } from "@mui/material";
import { ChangeEvent, FC, MouseEvent, useState } from "react";


export const SimpleInput: FC = () => {
	const [targetImg, setTargetImg] = useState('');

	const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target!.files![0];
		const reader = new FileReader();

		reader.onloadend = () => {
			console.log(`onLoadEnd`);

			setTargetImg(URL.createObjectURL(file))
		};

		reader.readAsDataURL(file);
	};

	const handleClickPagination = (index: number) => {
		console.log(`index: ${index}`);
	};

	return (
		<>
			<Grid container direction="column" alignItems="center">
				<Grid item>
					<img width="100%" src={targetImg} />
				</Grid>
			</Grid>
			<div>
				<Button variant="contained">
					image here
					<input accept="image/*" type="file" onChange={(e) => handleUploadImage(e)} />
				</Button>
			</div>
			<Pagination 
				sx={{ marginTop: "2px" }}
				count={10} 
				color="primary" 
				onChange={(e, index) => handleClickPagination(index)} 
			/>
		</>
	);
};