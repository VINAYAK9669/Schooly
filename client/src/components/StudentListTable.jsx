/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useLocation } from "react-router-dom";
import { useTable } from "react-table/dist/react-table.development";

// Utility function to determine the correct accessor
const determineNameAccessor = (data) => {
  if (data.length > 0) {
    const keys = Object.keys(data[0]);
    if (keys.includes("name")) {
      return "name";
    } else if (keys.includes("studentName")) {
      return "studentName";
    }
  }
  return "name"; // Default accessor
};

function StudentListTable({ studentList, onEdit, onDelete }) {
  const data = React.useMemo(() => studentList, [studentList]);

  const nameAccessor = React.useMemo(() => determineNameAccessor(data), [data]);

  const hasClassParam = window.location.href.includes("student");

  const columns = React.useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: nameAccessor,
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
        Cell: ({ row }) =>
          hasClassParam ? (
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
          ) : (
            "-"
          ), // If hasClassParam is false, render nothing (or return a placeholder if needed)
      },
    ],
    [nameAccessor, onEdit, onDelete]
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
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 bg-gray-200 border border-gray-300 text-sm font-medium"
                  key={column.id}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-4 py-2 border-b border-gray-300 text-sm"
                    key={cell.column.id}
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
