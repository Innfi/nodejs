import { DataGrid, GridColDef, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { FormatBold, FormatItalic, FormatUnderlined } from '@mui/icons-material';
import { FC, MouseEvent, SyntheticEvent } from 'react';
import { TextField } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const HandleItemSelect = (item: GridRowSelectionModel) => {
  console.log(`id: ${item}`);
};



export const Table: FC = () => {


  const handleClickEvent = (e: MouseEvent) => {
    console.log(e);
  };

  const handleSelectEvent = (e: SyntheticEvent<HTMLDivElement, Event>) => {
    console.log(`target: ${e.target}`);
  };

  return (
    <>
      <div>
        <FormatBold onClick={(e) => handleClickEvent(e)} />
        <FormatItalic />
        <FormatUnderlined />
      </div>
      <div>
        <TextField 
          fullWidth 
          onSelectCapture={(e) => handleSelectEvent(e)}
        />
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} 
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}

          pageSizeOptions={[5, 10]}
          checkboxSelection

          onRowSelectionModelChange={(props) => HandleItemSelect(props)}
        />
      </div>
    </>
  );
};