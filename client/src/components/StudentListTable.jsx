/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React from "react";
import { useTable } from "react-table/dist/react-table.development";

function StudentListTable({ studentList, onEdit, onDelete }) {
  const data = React.useMemo(() => studentList, [studentList]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "name",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Date of Birth",
        accessor: "dob",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Fees Paid",
        accessor: "feesPaid",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => onEdit(row.original)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => onDelete(row.original)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="mt-4">
      <h4 className="text-xl font-semibold">Student List</h4>
      <table
        {...getTableProps()}
        className="min-w-full table-auto text-left border-collapse"
      >
        <thead>
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={`headerGroup-${headerGroupIndex}`}
            >
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 bg-gray-200 border border-gray-300 text-sm font-medium"
                  key={`column-${columnIndex}`}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-4 py-2 border-b border-gray-300 text-sm"
                    key={cellIndex}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentListTable;
