/* eslint-disable no-unused-vars */
import { useMutation, useQuery } from "@tanstack/react-query";
import useApiFun from "./useApiFun";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function useRouter() {
  const navigate = useNavigate();
  // Redux state
  const { signUpUserDetails } = useSelector((state) => state.auth);
  const {
    createStudent,
    signInStudentFun,
    getClasses,
    signUpTeacherFun,
    signInTeacherFun,
    getTeacherFun,

    createClassFun,
    deleteClassFunction,
    getStudentDetailFun,
    getStudentListFun,
    updateStudentFn,
    deleteStudentFun,
    updateTeacherFun,
    updateSubject,
    updateTeacherFn,
    getTeacherDetailFun,
  } = useApiFun();
  const disptach = useDispatch();

  // TODO: --------- STUDENT ROUTE ------
  //   TODO: Student Sign Up
  const signupStudent = useMutation({
    mutationFn: createStudent,
    onSuccess: (data) => {
      signinStudent.mutate(signUpUserDetails);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
      disptach(setCurrentUser([]));
    },
  });

  //   TODO: Student Sign In
  const signinStudent = useMutation({
    mutationFn: signInStudentFun,
    onSuccess: (data) => {
      // Assuming `data.token` contains the token you want to store
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        toast.success("Student logged in successfully!");

        // Decode token to get userID and navigate
        const { id } = jwtDecode(data.token);
        navigate(`/dashboard/${id}`);
      } else {
        toast.error("Login successful but no token received.");
      }
    },
    onError: (err) => {
      console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    },
  });

  //   TODO: Signup Teacher
  const signupTeacher = useMutation({
    mutationFn: signUpTeacherFun,
    onSuccess: (data) => {
      signinTeacher.mutate(signUpUserDetails);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "something went wrong");
      disptach(setCurrentUser([]));
    },
  });

  //   TODO: Teacher Sign In
  const signinTeacher = useMutation({
    mutationFn: signInTeacherFun,
    onSuccess: (data) => {
      // Assuming `data.token` contains the token you want to store
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        toast.success("Teacher logged in successfully!");

        // Decode token to get userID and navigate
        const { userId } = jwtDecode(data.token);
        navigate(`/dashboard/${userId}`);
      } else {
        toast.error("Login successful but no token received.");
      }
    },
    onError: (err) => {
      console.error(err);
      toast.error(err?.response?.data?.message);
    },
  });

  //TODO: Query for fetching class lists
  const classLists = useQuery({
    queryKey: ["classes"], // Use a unique query key
    queryFn: getClasses,
    select: (data) => data, // Transform the data if needed
    onSuccess: (data) => {
      console.log("Classes fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching classes:", error);
      toast.error("Error fetching classes");
    },
    enabled: false,
  });

  // TODO: Teacher List

  const teacherList = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeacherFun,
    onSuccess: (data) => {
      console.log("Teacher fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching in teacher list:", error);
      toast.error("Error fetching teachers");
    },
    enabled: false,
  });

  // TODO: Student Detail
  const studentList = useQuery({
    queryKey: ["students"],
    queryFn: getStudentListFun,
    onSuccess: (data) => {
      console.log("Student List fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching students:", error);
      toast.error("Error fetching student Lists");
    },
    enabled: false,
  });

  // TODO: Create a class
  const createClass = useMutation({
    mutationFn: createClassFun,
    onSuccess: (data) => {
      toast.success("Class Added");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "something went wrong");
      // disptach(setCurrentUser([]));
    },
  });

  //TODO: deleteClass
  const deleteClass = useMutation({
    mutationFn: deleteClassFunction,
    onSuccess: (data) => {
      toast.success("Class Delete");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "something went wrong");
      // disptach(setCurrentUser([]));
    },
  });

  // TODO: Student Update
  const studentUpdate = useMutation({
    mutationFn: updateStudentFn,
    onSuccess: (data) => {
      toast.success("Student Details Updated");
      studentList.refetch();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "something went wrong");
      // disptach(setCurrentUser([]));
    },
  });
  // TODO: Student delete
  const stduentDelete = useMutation({
    mutationFn: deleteStudentFun,
    onSuccess: (data) => {
      toast.success("Student Details Deleted");
      studentList.refetch();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "something went wrong");
    },
  });
  // TODO: update STeacher Details
  const updateAssignedSubject = useMutation({
    mutationFn: updateSubject,
    onSuccess: (data) => {
      toast.success("Subject Assigned successfully");
      classLists.refetch();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "something went wrong");
    },
  });

  // TODO: update STeacher Details
  const updateTeacher = useMutation({
    mutationFn: updateTeacherFun,
    onSuccess: (data) => {
      toast.success("Teacher Deatils successfully upated");
      console.log(data);
      teacherList.refetch();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "something went wrong");
    },
  });

  // TODO: get student Deatils
  const getStudentDetail = useQuery({
    queryKey: ["studentDeatil"],
    queryFn: getStudentDetailFun,
    onSuccess: (data) => {
      console.log("Student Deatils fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching in Student Deatils:", error);
      toast.error("Error fetching teachers");
    },
    enabled: false,
  });

  // TODO: get Teacher Deatils
  const getTeacherDeatils = useQuery({
    queryKey: ["teacherDetails"],
    queryFn: getTeacherDetailFun,
    onSuccess: (data) => {
      console.log("Teacher Deatils fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching in Teacher Deatils:", error);
      toast.error("Error fetching teachers");
    },
    enabled: false,
  });

  return {
    signupStudent,
    signinStudent,
    signupTeacher,
    classLists,
    signinTeacher,
    studentList,
    teacherList,
    createClass,
    deleteClass,
    studentUpdate,
    stduentDelete,
    updateAssignedSubject,
    updateTeacher,
    getStudentDetail,
    getTeacherDeatils,
  };
}

export default useRouter;
