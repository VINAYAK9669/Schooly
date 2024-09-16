/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiOutlineX, HiPlus } from "react-icons/hi";

function ClassModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    classGrade: "",
    classDetails: [{ subjectName: "" }],
    year: "",
    studentFees: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubjectChange = (index, e) => {
    const newClassDetails = [...formData.classDetails];
    newClassDetails[index].subjectName = e.target.value;
    setFormData({ ...formData, classDetails: newClassDetails });
  };

  const handleAddSubject = () => {
    setFormData({
      ...formData,
      classDetails: [...formData.classDetails, { subjectName: "" }],
    });
  };

  const handleRemoveSubject = (index) => {
    const newClassDetails = [...formData.classDetails];
    newClassDetails.splice(index, 1);
    setFormData({ ...formData, classDetails: newClassDetails });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData);
    onClose();
    setFormData({
      classGrade: "",
      classDetails: [{ subjectName: "" }],
      year: "",
      studentFees: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Class</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Class Grade</label>
            <input
              type="text"
              name="classGrade"
              value={formData.classGrade}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="max-h-[225px] overflow-y-auto w-full custom-scrollbar">
            {formData.classDetails.map((detail, index) => (
              <div key={index} className="mb-4 flex items-center">
                <div className="flex-1">
                  <label className="block text-gray-700">
                    Subject {index + 1}
                  </label>
                  <input
                    type="text"
                    value={detail.subjectName}
                    onChange={(e) => handleSubjectChange(index, e)}
                    className="mt-1 p-2 border rounded w-full"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSubject(index)}
                  className="ml-2 text-red-500"
                >
                  <HiOutlineX />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddSubject}
            className="flex items-center text-blue-500 mb-4"
          >
            <HiPlus />
            Add Subject
          </button>

          <div className="mb-4">
            <label className="block text-gray-700">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
              placeholder="Ex:2023-2024"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Student Fees</label>
            <input
              type="number"
              name="studentFees"
              value={formData.studentFees}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClassModal;
