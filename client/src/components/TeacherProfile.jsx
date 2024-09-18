/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useRouter from "../confiiguration/useRouter";

const TeacherProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const { getTeacherDeatils, updateTeacher } = useRouter();
  console.log(getTeacherDeatils?.data?.data.data);

  useEffect(() => {
    getTeacherDeatils.refetch();
  }, []);

  useEffect(() => {
    // Reset form with fetched data
    if (getTeacherDeatils?.data?.data) {
      const dob = getTeacherDeatils.data.data.dob;
      const formattedDob =
        dob && !isNaN(new Date(dob).getTime())
          ? new Date(dob).toISOString().split("T")[0]
          : ""; // Default to empty string if invalid date

      reset({
        name: getTeacherDeatils.data.data.name,
        gender: getTeacherDeatils.data.data.gender,
        dob: formattedDob,
        mobileNumber: getTeacherDeatils.data.data.mobileNumber,
        email: getTeacherDeatils.data.data.email,
      });
    }
  }, [getTeacherDeatils?.data?.data, reset]);

  const onSubmit = (data) => {
    // Create a new object without the password field if it's empty
    const { password, ...dataWithoutPassword } = data;

    // Prepare form data for mutation
    const formData = password
      ? { ...dataWithoutPassword, password }
      : dataWithoutPassword;

    // Call the updateTeacher mutation with the prepared data
    updateTeacher.mutate({ formData });
    console.log(formData);
    setIsEditMode(false);
  };

  // Group subjects by class only if `assignedSubjects` exists
  const subjectsByClass = getTeacherDeatils?.data?.data.assignedSubjects
    ? getTeacherDeatils?.data?.data.assignedSubjects.reduce((acc, subject) => {
        if (!acc[subject.className]) {
          acc[subject.className] = [];
        }
        acc[subject.className].push(subject.subjectName);
        return acc;
      }, {})
    : {};

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
            <p
              onClick={() => setIsEditMode(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Personal Details
            </p>
          )}
        </div>
      </form>

      {/* Assigned Subjects Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Assigned Subjects</h2>
        {Object.keys(subjectsByClass).length > 0 ? (
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
        ) : (
          <p>No subjects assigned.</p> // Display message if no subjects
        )}
      </div>
    </div>
  );
};

export default TeacherProfile;
