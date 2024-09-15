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
        const { id } = jwtDecode(data.token);
        navigate(`/dashboard/${id}`);
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

  return {
    signupStudent,
    signinStudent,
    signupTeacher,
    classLists,
    signinTeacher,
  };
}

export default useRouter;
