import { useMemo, useState } from 'react';
import {
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  MRT_TableContainer,
} from 'material-react-table';
import { Button } from '@mui/material';

export type Person = {
  firstName: string;
  lastName: string;
  city: string;
};

export const initData = [
  {
    firstName: 'Dylan',
    lastName: 'Murray',
    city: 'East Daphne',
  },
  {
    firstName: 'Raquel',
    lastName: 'Kohler',
    city: 'Columbus',
  },
  {
    firstName: 'Ervin',
    lastName: 'Reinger',
    city: 'South Linda',
  },
  {
    firstName: 'Brittany',
    lastName: 'McCullough',
    city: 'Lincoln',
  },
  {
    firstName: 'Branson',
    lastName: 'Frami',
    city: 'Charleston',
  },
];

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
    //end
  );

  const [data, setData] = useState(() => initData);
  const [toggle, setToggle] = useState(false);

  const table = useMaterialReactTable({
    autoResetPageIndex: false,
    columns,
    data,
    enableRowOrdering: toggle,
    enableRowNumbers: true,
    rowNumberDisplayMode: 'static',
    enableSorting: false,
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          data.splice(
            (hoveredRow as MRT_Row<Person>).index,
            0,
            data.splice(draggingRow.index, 1)[0],
          );
          data.forEach((v, index: number) => {
            console.log(`index: ${index}, data: ${v.firstName}`);
          });
          setData([...data]);
        }
      },
    }),
  });

  return (<div>
    <Button variant="outlined" onClick={() => { setToggle(!toggle); }}>Outlined</Button>
    <MRT_TableContainer table={table} />
  </div>);
};

export default Example;
