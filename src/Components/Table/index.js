import React from 'react';
import { useTable } from 'react-table';
import { Tbl, Td, Th, Thead } from './TableElements';

const editTable = (row, i) => {
  if (row === i) {
    console.log(row.cells[7])
  }
}

const Table = ({ data, columns, edit, index }) => {
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
              <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
            ))}
          </tr>
        ))}
      </Thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          // console.log(index, row)
          // edit ? 
          editTable(row, index)

          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell, i) => {
                // console.log(cell)
                
                // edit ? <>cell.column.Cell(() => <button><FaCheck /></button>)</>: 
               return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
        })}
            </tr>
            );
        })}
      </tbody>
    </Tbl>
  );
};

export default Table;
