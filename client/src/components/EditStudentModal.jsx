/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import useRouter from "../confiiguration/useRouter";

function EditStudentModal({ isOpen, onClose, student }) {
  const { studentUpdate } = useRouter();
  const [formData, setFormData] = useState({
    studentName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    feesPaid: "",
  });

  // Helper function to format date from "yyyy-MM-ddTHH:mm:ss.sssZ" to "yyyy-MM-dd"
  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    return isoDate.split("T")[0]; // Extract the date part
  };

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || student.studentName || "",
        gender: student.gender || "",
        dob: formatDate(student.dob), // Format the date before setting it
        phone: student.phone || "",
        email: student.email || "",
        feesPaid: student.feesPaid || "",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(formData);
    studentUpdate.mutate({ id: student.id, formData });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Gender</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob} // This will now be in "yyyy-MM-dd" format
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Fees Paid</label>
            <input
              type="number"
              name="feesPaid"
              value={formData.feesPaid}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 p-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudentModal;
