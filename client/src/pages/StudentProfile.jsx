/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useTable } from "react-table";
import Button from "../utils/Button";
import useRouter from "../confiiguration/useRouter";

function StudentProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const { getStudentDetail, studentUpdate } = useRouter();

  // Update form fields when data is fetched
  useEffect(() => {
    if (getStudentDetail?.data) {
      const student = getStudentDetail.data;
      setValue("name", student.name);
      setValue("gender", student.gender);
      setValue("dob", new Date(student.dob).toISOString().split("T")[0]);
      setValue("phone", student.phone);
      setValue("email", student.email);
    }
  }, [getStudentDetail?.data, setValue]);

  // React-table setup for class subjects
  const data = useMemo(
    () => getStudentDetail?.data?.enrolledClass?.classDetails || [], // Fallback to an empty array if undefined
    [getStudentDetail?.data?.enrolledClass?.classDetails] // Add as a dependency
  );
  const columns = useMemo(
    () => [
      {
        Header: "Subject Name",
        accessor: "subjectName",
      },
      {
        Header: "Teacher Name",
        accessor: (row) => row.assignedTo?.teacherName || "Unassigned", // Safely handle undefined
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const onSubmit = (formData, event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log(formData);
    studentUpdate.mutate({ id: getStudentDetail?.data._id, formData });
    setIsEditMode(false);
  };

  useEffect(() => {
    getStudentDetail.refetch();
  }, []);

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
          <select
            {...register("gender")}
            disabled={!isEditMode}
            className={`mt-1 block w-full border ${
              isEditMode ? "border-gray-500" : "border-gray-300"
            } rounded-md p-2`}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dob")}
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
            <div className="max-w-[320px] min-w-[280px] mx-auto">
              <Button handleForm={() => setIsEditMode(true)}>
                Edit Personal Details
              </Button>
            </div>
          )}
        </div>
      </form>

      {/* Class Details Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Class Details</h2>
      <div className="mb-4 max-w-[320px]">
        <div className="flex justify-between mb-2">
          <span className="font-medium">Class Grade:</span>
          <span>{getStudentDetail?.data?.enrolledClass.classGrade}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-medium">Student Fees:</span>
          <span>₹{getStudentDetail?.data?.enrolledClass.studentFees}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="font-medium">Date of Enrollment:</span>
          <span>
            {new Date(
              getStudentDetail?.data?.enrollmentDate
            ).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full table-auto bg-white shadow-lg rounded-md"
        >
          <thead className="bg-gray-200">
            {headerGroups?.map((headerGroup) => (
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
