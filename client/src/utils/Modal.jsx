/* eslint-disable react/prop-types */

const Modal = ({ actionType, student, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 capitalize">
          {actionType} Student
        </h2>

        {actionType === "edit" ? (
          <>
            <p>Edit details for {student.studentName}.</p>
            {/* Add form or logic for editing */}
          </>
        ) : (
          <>
            <p>Are you sure you want to delete {student.studentName}?</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => {
                // Add delete logic here
                console.log("Student deleted:", student.id);
                closeModal();
              }}
            >
              Confirm Delete
            </button>
          </>
        )}

        <button
          className="bg-gray-300 text-black px-4 py-2 rounded mt-4"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
