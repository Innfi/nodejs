import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Table, TableBody, TableCell, TableContainer, TableHead, 
	TablePagination, TableRow, TableSortLabel, Toolbar, Typography, 
	Papter, Checkbox, IconButton, Tooltip, FormControlLabel, 
	Switch } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Delete, FilterList } from '@material-ui/icons';



function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}
  
const rows = [
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Donut', 452, 25.0, 51, 4.9),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
	createData('Honeycomb', 408, 3.2, 87, 6.5),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Jelly Bean', 375, 0.0, 94, 0.0),
	createData('KitKat', 518, 26.0, 65, 7.0),
	createData('Lollipop', 392, 0.2, 98, 0.0),
	createData('Marshmallow', 318, 0, 81, 2.0),
	createData('Nougat', 360, 19.0, 9, 37.0),
	createData('Oreo', 437, 18.0, 63, 4.0),
];
  
function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) return -1;
	if (b[orderBy] > a[orderBy]) return 1;
	return 0;
}
  
function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}
  
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}
  
const headCells = [
	{ id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
	{ id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
	{ id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
	{ id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
	{ id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1)
	},
	highlight:
		theme.palette.type === 'light'
			? { color: theme.palette.secondary.main, 
				backgroundColor: lighten(theme.palette.secondary.light, 0.85)
			}
			: { color: theme.palette.text.primary, 
				backgroundColor: theme.palette.secondary.dark 
			},
	title: { flex: '1 1 100%' }
}));

const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const { numSelected } = props;

	return (
		<Toolbar className={clsx(classes.root, 
			{ [classes.highlight]: numSelected > 0 } )}>
			{ numSelected > 0 ? 
				(<Typography className={classes.title} color="inherit" 
					variant="subtitle" component="div" >
					{numSelected} selected
				</Typography> )
			  : ( <Typography className={classes.title} variants="h6" 
			  	id="tableTitle" component="div"> Nutrition </Typography> )
			}
		</Toolbar>
	);
};