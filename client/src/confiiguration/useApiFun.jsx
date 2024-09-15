import axios from "axios";
import {
  classListURL,
  studentSignInApiURL,
  studentSignUpApiURL,
  teacherSignInApiURL,
  teacherSignUpApiURL,
} from "./apiUrls";

function useApiFun() {
  // Function to create a student (POST request)
  const createStudent = async (studentData) => {
    try {
      const response = await axios.post(studentSignUpApiURL, studentData);

      return response.data; // Return the response data if needed
    } catch (error) {
      console.error(
        "Error creating student:",
        error.response ? error.response.data : error.message
      );
      throw error; // Optionally throw the error if you want to handle it in the component
    }
  };

  const signInStudentFun = async (studentData) => {
    try {
      const response = await axios.post(studentSignInApiURL, studentData);

      return response.data; // Return the response data if needed
    } catch (error) {
      console.error(
        "Error creating student:",
        error.response ? error.response.data : error.message
      );
      throw error; // Optionally throw the error if you want to handle it in the component
    }
  };

  //  TODO: TEACHER

  const signUpTeacherFun = async (teacherData) => {
    try {
      const response = await axios.post(teacherSignUpApiURL, teacherData);

      return response.data; // Return the response data if needed
    } catch (error) {
      console.error(
        "Error creating teacher:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const signInTeacherFun = async (teacherData) => {
    try {
      const response = await axios.post(teacherSignInApiURL, teacherData);

      return response.data; // Return the response data if needed
    } catch (error) {
      console.error(
        "Error creating teacher:",
        error.response ? error.response.data : error.message
      );
      throw error; // Optionally throw the error if you want to handle it in the component
    }
  };

  // Function to get the list of classes (GET request)
  const getClasses = async () => {
    try {
      const response = await axios.get(classListURL);

      return response.data; // Return the response data if needed
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error; // Optionally throw the error if you want to handle it in the component
    }
  };

  return {
    createStudent,
    signInStudentFun,
    signUpTeacherFun,
    getClasses,
    signInTeacherFun,
  };
}

export default useApiFun;
