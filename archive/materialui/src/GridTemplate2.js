import React from 'react';
import { Paper, Grid, Avatar, Typography } from '@material-ui/core';
import { Card, CardHeader, CardActions, CardContent, 
    Button, IconButton, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Favorite, Share } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1, 
		overflow: 'hidden',
		padding: theme.spacing(0, 3),
	},
	paper: {
		maxWidth: 400,
		margin: `${theme.spacing(1)}px auto`,
		padding: theme.spacing(2)
	}
}));

const testData = [
	{ author: 'innfi', text: 'testData text 1'},
	{ author: 'ennfi', text: 'testData text 2'},
];

export const TestGridNoWrap = () => {
	const classes = useStyles();

	return (
		testData.map((unit, index) => (
			<PaperUnit props={unit} key={index} />
		))
	);
};

const PaperUnit = (data, key) => {
	const classes = useStyles();
	const { author, text } = data.props;

	// return (
	// 	<Paper className={classes.root}>
	// 		<Card className={classes.root}>
	// 			<CardHeader 
	// 				avatar={
	// 					<Avatar aria-label="cardAvatar" className={classes.avatar}>
	// 						{author}
	// 					</Avatar>
	// 				} 
	// 				title={author}
	// 				subheader="users moment"
	// 				/>
	// 			<CardContent>
	// 				<Typography variant="body2" color="textPrimary" component="p">
	// 					{text} 
	// 				</Typography>
	// 			</CardContent>
	// 			<CardActions disableSpacing>
	// 				<IconButton aria-label="add to favorites">
	// 					<Favorite />
	// 				</IconButton>
	// 				<IconButton aria-label="share">
	// 					<Share />
	// 				</IconButton>
	// 			</CardActions>
	// 		</Card>
	// 	</Paper>
	// );

	return (
		<Paper className={classes.paper}>
			<Grid container wrap="nowrap" spacing={3}>
				<Grid item>
					<Avatar>{author}</Avatar>
				</Grid>
				<Grid item xs zeroMinWidth>
					<Typography noWrap>{text}</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};