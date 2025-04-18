import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_PaginationState,
  MRT_Row,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { useQuery } from 'react-query';
import { IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

//example data type
type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

type FetchPersonList = {
  list: Person[];
  total: number;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Omaha',
    state: 'Nebraska',
  },
];

export function App() {
  const [personList, setPersonList] = useState<Person[]>([]);

  const { data: response, isError, isRefetching, isLoading, refetch } = useQuery<FetchPersonList>({
    queryKey: 'PersonList',
    queryFn: async () => {
      // fetching: fetch / axios?
      return {
        list: [],
        total: 0
      } as FetchPersonList;
    },
  });

  useEffect(() => {
    if (response) setPersonList(response.list);
  }, [response]);


  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
      },
    ],
    [],
  );
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex:0,
    pageSize: 10
  });
  const dummyTotalRowCount = 100;
  // can use pagination in useEffect() for refetching

  const table = useMaterialReactTable({
    autoResetPageIndex: false,
    columns,
    data, 
    manualPagination: true,
    onPaginationChange: setPagination,
    rowCount: dummyTotalRowCount,
    state: {
      pagination,
      isLoading,
      showProgressBars: isRefetching,
      showAlertBanner: isError,
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: (event) => {
        console.info(event, row.id);
      },
      sx: {
        cursor: 'pointer',
      },
    }),
    muiRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const { draggingRow, hoveredRow } = table.getState();
        if (hoveredRow && draggingRow) {
          personList.splice(
            (hoveredRow as MRT_Row<Person>).index,
            0,
            personList.splice(draggingRow.index, 1)[0],
          );
          setPersonList([...personList]);
        }
      },
    }),
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title="refresh">
        <IconButton onClick={() => refetch()}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    ),
  });

  return <MaterialReactTable table={table} />;
}
