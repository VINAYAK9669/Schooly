// apiUrls.js

const BASE_URL = import.meta.env.VITE_BASE_URL;

// STUDENT API ENDPOINTS
const studentSignUpApiURL = `${BASE_URL}students/create`;
const studentSignInApiURL = `${BASE_URL}students/signin`;
const studentModifyURL = `${BASE_URL}students/`;

// TEACHER API ENDPOINTS
const teacherSignUpApiURL = `${BASE_URL}teacher/signup`;
const teacherSignInApiURL = `${BASE_URL}teacher/signin`;
const teacherUpdateDetailsURL = `${BASE_URL}admin/update-teacher/`;

// CLASS API ENDPOINTS
const classCreateURL = `${BASE_URL}admin/class/create`;
const classListURL = `${BASE_URL}admin/class`;
const classDetailsURL = `${BASE_URL}admin/class`;
const classAssignTeacherURL = `${BASE_URL}admin/class`; // send request as body { classId, subjectId, teacherId}

export {
  studentSignUpApiURL,
  studentSignInApiURL,
  studentModifyURL,
  teacherSignUpApiURL,
  teacherSignInApiURL,
  teacherUpdateDetailsURL,
  classCreateURL,
  classListURL,
  classDetailsURL,
  classAssignTeacherURL,
};
