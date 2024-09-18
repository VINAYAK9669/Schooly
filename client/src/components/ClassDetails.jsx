/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Header from "../utils/Header";
import SubjectDetailsTable from "./SubjectDeatilsTable";
import StudentListTable from "./StudentListTable";
import GenderDistributionChart from "./GenderDistributionChart";
import ClassModal from "./ClassModal";
import useRouter from "../confiiguration/useRouter";

function ClassDetails({ classLists }) {
  const [selectedClass, setSelectedClass] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { createClass, classLists: getClassList, deleteClass } = useRouter();

  const handleCardClick = (classData) => {
    setSelectedClass(classData);
  };

  const handleAddClass = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (data) => {
    // Handle form submission, e.g., send data to server
    console.log("Class Data Submitted:", data);
    createClass.mutate(data);
    getClassList.refetch();
  };
  const handleDeleteClass = (id) => {
    //
    deleteClass.mutate(id);
  };

  useEffect(() => {
    getClassList.refetch();
    setSelectedClass(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createClass.isSuccess, deleteClass.isSuccess]);

  return (
    <div className="p-8">
      <Header category="h1">Class Rooms</Header>

      {/* Add Classes Button */}
      <div className="w-full flex justify-between items-center">
        <button
          onClick={handleAddClass}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Classes
        </button>
        {selectedClass && (
          <button
            onClick={() => handleDeleteClass(selectedClass._id)}
            className="bg-pink-500 text-white px-4 py-2 rounded mb-4"
          >
            Delete the {selectedClass.classGrade} class
          </button>
        )}
      </div>

      {/* Cards displaying class details */}
      <div className="grid grid-cols-3 gap-4">
        {classLists?.data?.map((classItem) => (
          <div
            key={classItem._id}
            className="p-4 border rounded shadow cursor-pointer"
            onClick={() => handleCardClick(classItem)}
            style={
              selectedClass === classItem ? { background: "lightpink" } : {}
            }
          >
            <h3 className="text-xl font-semibold">{classItem.classGrade}</h3>
            <p>{classItem.year}</p>
          </div>
        ))}
      </div>

      {/* Conditionally render tables and chart based on selected class */}
      {selectedClass && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold">
            Details for Class: {selectedClass.classGrade}
          </h3>

          {/* Gender Distribution Chart */}
          <GenderDistributionChart studentList={selectedClass.studentList} />

          {/* Subject Details Table */}
          <SubjectDetailsTable
            classDetails={selectedClass.classDetails}
            classId={selectedClass._id}
          />

          {/* Student List Table */}
          <StudentListTable studentList={selectedClass.studentList} />
        </div>
      )}

      {/* Class Modal */}
      <ClassModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default ClassDetails;
