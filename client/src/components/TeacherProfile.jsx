import { useState } from "react";
import { useForm } from "react-hook-form";

// Example teacher data
const teacherData = {
  _id: "66e6ef545d0cd638b907c5cf",
  name: "John Doe",
  email: "johndoe10@example.com",
  mobileNumber: "9876543210",
  dob: "2000-01-01T00:00:00.000Z",
  gender: "MALE",
  salary: 0,
  password: "$2a$12$8OGEYXaL8WGEbZg2gEIVquAK43DDD80NX20Jlarc8wb7n5B6eHURK",
  assignedSubjects: [
    {
      subjectName: "Mathematics",
      className: "5th",
    },
    {
      subjectName: "Science",
      className: "5th",
    },
  ],
  __v: 2,
};

const TeacherProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    // Handle form submission logic here
  };

  // Group subjects by class
  const subjectsByClass = teacherData.assignedSubjects.reduce(
    (acc, subject) => {
      if (!acc[subject.className]) {
        acc[subject.className] = [];
      }
      acc[subject.className].push(subject.subjectName);
      return acc;
    },
    {}
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teacher Profile</h1>

      {/* Personal Details Form */}
      <form
        className="grid grid-cols-2 gap-4 bg-white shadow-md rounded-lg p-6 mb-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            defaultValue={teacherData.name}
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
            defaultValue={teacherData.gender}
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
            defaultValue={new Date(teacherData.dob).toISOString().split("T")[0]}
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
            {...register("mobileNumber")}
            defaultValue={teacherData.mobileNumber}
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
            defaultValue={teacherData.email}
            disabled={!isEditMode}
            className={`mt-1 block w-full border ${
              isEditMode ? "border-gray-500" : "border-gray-300"
            } rounded-md p-2`}
          />
        </div>
        {isEditMode && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter new password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        )}

        {/* Button to toggle edit mode */}
        <div className="col-span-2 mt-4 flex justify-end">
          {isEditMode ? (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditMode(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Personal Details
            </button>
          )}
        </div>
      </form>

      {/* Assigned Subjects Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Assigned Subjects</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Subjects</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(subjectsByClass).map(([className, subjects]) => (
              <tr key={className} className="border-b">
                <td className="px-4 py-2">{className}</td>
                <td className="px-4 py-2">{subjects.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherProfile;
