// useStudentApi.js
import { useMutation } from "@tanstack/react-query";
import useApiFun from "./useApiFun";

export const useStudentApi = () => {
  const { studentSignUp, studentSignIn, modifyStudent, deleteStudent } =
    useApiFun();

  // Student Signup Mutation
  const signUpMutation = useMutation(studentSignUp, {
    onError: (error) => {
      console.error("Error during student signup:", error);
    },
  });

  // Student Sign-in Mutation
  const signInMutation = useMutation(studentSignIn, {
    onError: (error) => {
      console.error("Error during student sign-in:", error);
    },
  });

  // Modify Student Mutation
  const modifyStudentMutation = useMutation(modifyStudent, {
    onError: (error) => {
      console.error("Error modifying student:", error);
    },
  });

  // Delete Student Mutation
  const deleteStudentMutation = useMutation(deleteStudent, {
    onError: (error) => {
      console.error("Error deleting student:", error);
    },
  });

  return {
    signUpMutation,
    signInMutation,
    modifyStudentMutation,
    deleteStudentMutation,
  };
};
