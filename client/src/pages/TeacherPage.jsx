/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { HiPencil } from "react-icons/hi";
import ReactModal from "react-modal"; // Modal for Edit/Delete
import Header from "../utils/Header";
import useRouter from "../confiiguration/useRouter";

ReactModal.setAppElement("#root"); // Required for accessibility

function TeacherPage() {
  const { teacherList, updateTeacher } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null); // To store the selected teacher for Edit/Delete
  const [modalAction, setModalAction] = useState(""); // To distinguish between Edit and Delete

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    dob: "",
    gender: "",
    salary: "",
  });

  // Function to open the modal and set the teacher to be edited or deleted
  const handleAction = (action, teacher) => {
    setModalAction(action);
    setCurrentTeacher(teacher);
    if (action === "edit") {
      // Populate the form with the teacher data
      setFormData({
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        mobileNumber: teacher.mobileNumber,
        dob: new Date(teacher.dob).toISOString().substring(0, 10), // Format to yyyy-MM-dd
        gender: teacher.gender,
        salary: teacher.salary,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTeacher(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    // Perform the edit action here (e.g., make an API call)
    console.log("Edited Teacher Data:", formData);
    updateTeacher.mutate({ id: formData.id, formData });
    closeModal();
  };

  const handleDelete = () => {
    // Perform the delete action here (e.g., make an API call with currentTeacher.id)
    console.log("Deleted Teacher:", currentTeacher);
    closeModal();
  };

  // Define columns using useMemo to avoid unnecessary re-renders
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        width: "150px", // Fixed width
      },
      {
        Header: "Email",
        accessor: "email",
        width: "200px", // Fixed width
      },
      {
        Header: "Mobile Number",
        accessor: "mobileNumber",
        width: "120px", // Fixed width
      },
      {
        Header: "DOB",
        accessor: (row) => new Date(row.dob).toLocaleDateString(),
        width: "120px", // Fixed width
      },
      {
        Header: "Gender",
        accessor: "gender",
        width: "100px", // Fixed width
      },
      {
        Header: "Salary",
        accessor: "salary",
        width: "100px", // Fixed width
      },
      {
        Header: "Subjects",
        accessor: "assignedSubjects",
        Cell: ({ value }) =>
          value.length > 0 ? (
            <ul className="list-disc list-inside text-xs">
              {value.map((subjectItem, index) => (
                <li key={index}>
                  <strong>{subjectItem?.class?.name}:</strong>{" "}
                  {subjectItem?.subject?.name}
                </li>
              ))}
            </ul>
          ) : (
            "No subjects assigned"
          ),
        width: "200px", // Fixed width
      },
      {
        Header: "Action",
        accessor: "action",
        width: "80px", // Fixed width
        Cell: ({ row }) => (
          <div className="flex space-x-2 justify-center">
            <HiPencil
              className="h-4 w-4 text-blue-500 cursor-pointer"
              onClick={() => handleAction("edit", row.original)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => teacherList.data || [], [teacherList.data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    teacherList.refetch();
  }, []);

  return (
    <div>
      <div className="p-8">
        <Header category="h2">Teacher Page</Header>
        <div className="overflow-x-auto">
          <table
            {...getTableProps()}
            className="min-w-full bg-white border border-gray-200 text-[10px]" // Smaller font size
          >
            <thead className="bg-gray-200 border-b text-xs">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-2 py-1 text-left font-medium text-gray-700"
                      style={{ width: column.width }} // Fixed width
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="divide-y divide-gray-200"
            >
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-100">
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-2 py-1 whitespace-nowrap"
                        style={{ width: cell.column.width }} // Fixed width
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

      {/* Modal for Edit/Delete */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={
          modalAction === "edit" ? "Edit Teacher" : "Delete Teacher"
        }
        className="modal bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {modalAction === "edit" ? (
          <div>
            <h2 className="text-xl font-bold">Edit Teacher</h2>
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Mobile Number</label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <label className="block text-sm">DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <label className="block text-sm">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <button
                type="button"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleEditSubmit}
              >
                Save Changes
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold">Delete Teacher</h2>
            <p className="mt-4">
              Are you sure you want to delete{" "}
              <strong>{currentTeacher?.name}</strong>?
            </p>
            <div className="mt-4 flex space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Confirm Delete
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </ReactModal>
    </div>
  );
}

export default TeacherPage;
