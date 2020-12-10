import React from 'react';
import { useTable } from 'react-table';
import { Tbl, Td, Th, Thead, Tbody } from './TableElements';

const columns = [
  {
    Header: "Recipient",
    accessor: "recipient",
  },
  {
    Header: "Weight",
    accessor: "weight",
  },
  {
    Header: "Destination",
    accessor: "destination",
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Price",
    accessor: 'price',
  }
]

const Table = ({ data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    //Render UI Here
    <Tbl {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </Th>
            ))}
          </tr>
        ))}
      </Thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Td {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </Td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Tbl>
  );
};

export default Table;
