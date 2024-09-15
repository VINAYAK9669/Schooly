/* eslint-disable react/jsx-key */
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMemo } from "react";
import { useTable } from "react-table";
import Button from "../utils/Button";

// Mock student data from backend
const studentData = {
  _id: "66e6caa5d5476a5682e075ae",
  name: "STUDENT 5",
  gender: "MALE",
  dob: "2005-05-15T00:00:00.000Z",
  phone: "1234567890",
  email: "johndoe5@example.com",
  feesPaid: 0,
  enrolledClass: {
    classGrade: "5th",
    classDetails: [
      { subjectName: "Mathematics", assignedTo: { teacherName: null } },
      { subjectName: "Science", assignedTo: { teacherName: null } },
      { subjectName: "English", assignedTo: { teacherName: null } },
      { subjectName: "History", assignedTo: { teacherName: null } },
      { subjectName: "Geography", assignedTo: { teacherName: null } },
      { subjectName: "Hindi", assignedTo: { teacherName: null } },
    ],
    year: "2023-2024",
    studentFees: 9000,
  },
  enrollmentDate: "2024-09-15T11:53:09.087Z",
};

function StudentProfile() {
  const { register, handleSubmit } = useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  // React-table setup for class subjects
  const data = useMemo(() => studentData.enrolledClass.classDetails, []);
  const columns = useMemo(
    () => [
      {
        Header: "Subject Name",
        accessor: "subjectName",
      },
      {
        Header: "Teacher Name",
        accessor: (row) => row.assignedTo.teacherName || "Unassigned",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const onSubmit = (formData, event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log("Updated student data:", formData);
    setIsEditMode(false);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      {/* Personal Details Section */}
      <h2 className="text-2xl font-bold mb-4">Personal Details</h2>

      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            defaultValue={studentData.name}
            disabled={!isEditMode}
            className={`mt-1 block w-full border ${
              isEditMode ? "border-gray-500" : "border-gray-300"
            } rounded-md p-2`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <input
            type="text"
            {...register("gender")}
            defaultValue={studentData.gender}
            disabled={!isEditMode}
            className={`mt-1 block w-full border ${
              isEditMode ? "border-gray-500" : "border-gray-300"
            } rounded-md p-2`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dob")}
            defaultValue={new Date(studentData.dob).toISOString().split("T")[0]}
            disabled={!isEditMode}
            className={`mt-1 block w-full border ${
              isEditMode ? "border-gray-500" : "border-gray-300"
            } rounded-md p-2`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            {...register("phone")}
            defaultValue={studentData.phone}
            disabled={!isEditMode}
            className={`mt-1 block w-full border ${
              isEditMode ? "border-gray-500" : "border-gray-300"
            } rounded-md p-2`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            defaultValue={studentData.email}
            disabled={!isEditMode}
            className={`mt-1 block w-full border ${
              isEditMode ? "border-gray-500" : "border-gray-300"
            } rounded-md p-2`}
          />
        </div>

        {/* Button to toggle edit mode */}
        <div className="col-span-2 mt-4">
          {isEditMode ? (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          ) : (
            <>
              {/* <button
              type="button"
              onClick={() => setIsEditMode(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Personal Details
            </button> */}
              <div className="max-w-[320px] min-w-[280px] mx-auto">
                <Button handleForm={() => setIsEditMode(true)}>
                  Edit Personal Details
                </Button>
              </div>
            </>
          )}
        </div>
      </form>

      {/* Class Details Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Class Details</h2>
      <div className="mb-4 max-w-[320px]">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Class Grade:</span>
          <span>{studentData.enrolledClass.classGrade}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-medium">Student Fees:</span>
          <span>₹{studentData.enrolledClass.studentFees}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="font-medium">Date of Enrollment:</span>
          <span>
            {new Date(studentData.enrollmentDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full table-auto bg-white shadow-lg rounded-md"
        >
          <thead className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-900"
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
                <tr {...row.getRowProps()} className="border-b">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-sm text-gray-700"
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
    </div>
  );
}

export default StudentProfile;
