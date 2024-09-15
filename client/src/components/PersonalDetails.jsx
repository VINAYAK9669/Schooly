/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const PersonalDetails = ({ data, onSave }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });

  const onSubmit = (formData) => {
    onSave(formData); // Call the parent component's onSave function
    setIsEditMode(false); // Switch off edit mode after saving
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
      <form
        className="grid grid-cols-2 gap-4"
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
        <div className="col-span-2 mt-4 flex justify-end">
          {isEditMode ? (
            <>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                type="button" // Changed type to button
                onClick={() => {
                  setIsEditMode(false);
                  reset(data); // Reset to original data if canceled
                }}
                className="ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button" // Changed type to button
              onClick={() => setIsEditMode(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Personal Details
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
