/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import useRouter from "../confiiguration/useRouter";

import StudentListTable from "../components/StudentListTable";
import EditStudentModal from "../components/EditStudentModal"; // Import Edit modal
import DeleteStudentModal from "../components/DeleteStudentModal"; // Import Delete modal

function StudentPage() {
  const { studentList } = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // useEffect(() => {
  //   studentList.refetch();
  // }, [studentUpdate.isSuccess]);

  useEffect(() => {
    studentList.refetch();
  }, []);

  const data = useMemo(() => studentList.data || [], [studentList.data]);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleUpdate = (updatedStudent) => {
    // Logic to update student data
    console.log("Updated student:", updatedStudent);
    // You can send this data to the backend or update it locally
    // studentUpdate.mutate(updatedStudent);
  };

  const handleConfirmDelete = (studentId) => {
    // Logic to delete student using studentId
    console.log("Deleted student with ID:", studentId);
    // Here you can call the backend API to delete the student
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="px-4 mt-10">
      <StudentListTable
        studentList={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <EditStudentModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleUpdate}
        student={selectedStudent}
      />
      <DeleteStudentModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleConfirmDelete}
        student={selectedStudent}
      />
    </div>
  );
}

export default StudentPage;
