/* eslint-disable react/prop-types */

import useRouter from "../confiiguration/useRouter";

function DeleteStudentModal({ isOpen, onClose, student }) {
  const { stduentDelete } = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Delete Student</h2>
        <p>
          Are you sure you want to delete the student{" "}
          <strong>{student?.name || student?.studentName}</strong>?
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 p-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              stduentDelete.mutate(student.id); // Call delete with student ID
              onClose(); // Close the modal
            }}
            className="bg-red-500 text-white p-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteStudentModal;
