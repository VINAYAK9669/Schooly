/* eslint-disable react/prop-types */
import React, { useState, useMemo } from "react";
import { useTable } from "react-table/dist/react-table.development";
import { HiPencil } from "react-icons/hi";
import ReactModal from "react-modal"; // Modal for Edit/Delete
import useRouter from "../confiiguration/useRouter";

ReactModal.setAppElement("#root"); // Required for accessibility

function SubjectDetailsTable({ classDetails, classId }) {
  const { teacherList } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const { classLists, updateAssignedSubject } = useRouter();

  // Fetch teacher list on component mount or when refetched
  React.useEffect(() => {
    teacherList.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  console.log(teacherList);

  // Prepare data for the table
  const data = useMemo(
    () =>
      classDetails.map((subject) => ({
        ...subject,
        teacherName: subject.assignedTo?.teacherName || "Unassigned",
      })),
    [classDetails]
  );

  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: "Subject Name",
        accessor: "subjectName",
      },
      {
        Header: "Teacher Name",
        accessor: "teacherName",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="flex space-x-2 justify-center">
            <HiPencil
              className="h-4 w-4 text-blue-500 cursor-pointer"
              onClick={() => handleEdit(row.original)}
            />
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Handle opening of the Edit modal
  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setSelectedTeacherId(subject.assignedTo?._id || ""); // Set default value in dropdown
    setIsModalOpen(true);
  };

  // Handle closing of the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubject(null);
  };

  // Handle teacher selection
  const handleTeacherChange = (e) => {
    setSelectedTeacherId(e.target.value);
  };

  // Handle form submission (e.g., API call or state update)
  const handleEditSubmit = () => {
    if (!selectedSubject) return;

    console.log(classId);
    const dataToSend = {
      classId: classId, // Assuming `classId` is part of `selectedSubject`
      subjectId: selectedSubject._id, // Assuming `subjectId` is part of `selectedSubject`
      teacherId: selectedTeacherId,
    };

    console.log("Edited Subject Data:", dataToSend);
    updateAssignedSubject.mutate(dataToSend);

    // Add your API call or state update logic here
    // Example: apiCallToUpdateSubject(dataToSend);

    classLists.refetch();
    closeModal();
  };

  return (
    <div className="mt-4">
      <h4 className="text-xl font-semibold">Subject Details</h4>
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

      {/* Modal for Editing Subject */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Subject"
        className="modal bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {selectedSubject && (
          <div>
            <h2 className="text-xl font-bold">Edit Subject</h2>
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-sm">Subject Name</label>
                <input
                  type="text"
                  value={selectedSubject.subjectName}
                  disabled
                  className="w-full border px-2 py-1 rounded bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm">Assign Teacher</label>
                <select
                  value={selectedTeacherId}
                  onChange={handleTeacherChange}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="">Unassigned</option>
                  {teacherList.data?.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
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
        )}
      </ReactModal>
    </div>
  );
}

export default SubjectDetailsTable;
