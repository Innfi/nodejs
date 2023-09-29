import { Button, Dialog, DialogContent, DialogTitle, Paper, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel, GridValueGetterParams } from '@mui/x-data-grid';
import { FC, useState } from 'react';

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

interface RowUnit {
  id: number;
  lastName: string;
  firstName: string | null;
  age: number | null;
};

const rows: RowUnit[] = [
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

export interface DialogProps {
  open: boolean;
  rowData: RowUnit|undefined;
  onClose: () => void;
};

export const SimpleDialog = (props: DialogProps) => {
  const { open, rowData, onClose }  = props; //need state not props
  const [edit, setEdit] = useState(true);

  const onClick = () => {
    setEdit(true);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{"test dialog"}</DialogTitle>
      <DialogContent>
        <TextField 
          label="first name" 
          value={rowData?.firstName} 
          InputProps={{
            readOnly: edit
          }}
        />
        <TextField 
          label="last name" 
          value={rowData?.lastName} 
          InputProps={{
            readOnly: edit
          }}
        />

        <Button 
          variant="contained" 
          color="primary"
          onClick={() => onClick()}
        >edit</Button>
        <Button 
          variant="contained" 
          color="secondary"
        >close</Button>
      </DialogContent>
    </Dialog>
  );
};

export const Table: FC = () => {
  const [open, setOpen] = useState(false);
  const [targetRow, setTargetRow] = useState<RowUnit>();

  const handleSelect = (props: GridRowSelectionModel) => {
    if (!props) return;
    console.log(`handleSelect: ${props[0]}`);

    const row = rows.find((unit) => unit.id === props[0]);

    setTargetRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} 
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}

        pageSizeOptions={[5, 10]}

        onRowSelectionModelChange={(props) => handleSelect(props) }
      />
      <SimpleDialog 
        open={open} 
        rowData={targetRow}
        onClose={handleClose}
      />
    </div>
  );
};
