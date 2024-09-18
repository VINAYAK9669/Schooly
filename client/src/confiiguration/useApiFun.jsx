import axios from "axios";
import {
  classCreateURL,
  classDeleteURL,
  classListURL,
  financeMonthlyURL,
  financeYearlyURL,
  studentDeatilsURL,
  studentListURL,
  studentSignInApiURL,
  studentSignUpApiURL,
  teacherListURL,
  teacherSignInApiURL,
  teacherSignUpApiURL,
  studentUpdateURL,
  studentModifyURL,
  teacherUpdateDetailsURL,
  classAssignTeacherURL,
  teacherDetailURL,
} from "./apiUrls";
import { useParams } from "react-router-dom";

function useApiFun() {
  const { userID } = useParams();
  console.log(userID);
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
  const getStudentDetail = async (id) => {
    try {
      const response = await axios.get(`${studentDeatilsURL}/${id}`);

      return response.data; // Return the response data if needed
    } catch (error) {
      console.error(
        "Error fetching stduent Details:",
        error.response ? error.response.data : error.message
      );
      throw error;
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

  // TODO: Teacher list
  const getTeacherFun = async () => {
    try {
      const response = await axios.get(teacherListURL);

      return response.data; // Return the response data if needed
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error; // Optionally throw the error if you want to handle it in the component
    }
  };
  // TODO: Student list
  const getStudentListFun = async () => {
    try {
      const response = await axios.get(studentListURL);

      return response.data; // Return the response data if needed
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error; // Optionally throw the error if you want to handle it in the component
    }
  };

  // TODO: Finance Monthly
  const getFinanceMonthly = async (year) => {
    console.log(year);
    try {
      const response = await axios.get(`${financeMonthlyURL}/${year}`);

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  // TODO: Finance Yearly
  const financeYearlyFun = async () => {
    try {
      const response = await axios.get(`${financeYearlyURL}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  // TODO: Create a Class
  const createClassFun = async (data) => {
    try {
      const response = await axios.post(classCreateURL, data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const deleteClassFunction = async (id) => {
    try {
      const response = await axios.delete(`${classDeleteURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  // TODO: update student Details
  const updateStudentFn = async ({ id, formData }) => {
    console.log(id);
    console.log(formData);
    try {
      const response = await axios.put(`${studentUpdateURL}${id}`, formData);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  // TODO: Delete Student
  const deleteStudentFun = async (id) => {
    console.log(id);

    try {
      const response = await axios.delete(`${studentModifyURL}${id}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  // TODO: Update Teacher
  const updateTeacherFun = async ({ id, formData }) => {
    console.log(id, userID, formData);

    try {
      const response = await axios.put(
        `${teacherUpdateDetailsURL}${id || userID}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  // TODO: Update Subject
  const updateSubject = async (formData) => {
    try {
      const response = await axios.put(`${classAssignTeacherURL}`, formData);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };
  // TODO: get Subject
  const getStudentDetailFun = async () => {
    console.log(userID);
    try {
      const response = await axios.get(`${studentModifyURL}${userID}`);

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  const getTeacherDetailFun = async () => {
    console.log(userID);
    try {
      const response = await axios.get(`${teacherDetailURL}${userID}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching classes:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  return {
    createStudent,
    signInStudentFun,
    signUpTeacherFun,
    getClasses,
    signInTeacherFun,
    getTeacherFun,
    getStudentListFun,
    getFinanceMonthly,
    financeYearlyFun,
    createClassFun,
    deleteClassFunction,
    getStudentDetail,
    updateStudentFn,
    deleteStudentFun,
    updateTeacherFun,
    updateSubject,
    getStudentDetailFun,
    getTeacherDetailFun,
  };
}

export default useApiFun;
