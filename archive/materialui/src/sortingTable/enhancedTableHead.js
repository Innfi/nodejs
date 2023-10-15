import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';


export const EnhancedTableHead = (props) => {
	const { clases, onSelectALlClick, order, orderBy, numSelected, rowCount,
		onRequiestSort } = props;

	const createSortHandler = (property) => (event) => {
		onRequiestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox indeterminate={numSelected > 0 && numSelect < rowCount} 
						checked={rowCount > 0 && numSelected === rowCount} 
						onChange={onSelectedAllClick} 
						inputProps={{ 'aria-label': 'select all desserts' }}
					/>
				</TableCell>
			</TableRow>
		</TableHead>
	);
};
  
EnhancedTableHead.propTypes = {
	classes: PropTypes.object, isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};