// apiUrls.js

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

// STUDENT API ENDPOINTS
const studentSignUpApiURL = `${BASE_URL}students/create`;
const studentSignInApiURL = `${BASE_URL}students/signin`;
const studentModifyURL = `${BASE_URL}students/`;
const studentListURL = `${BASE_URL}admin/students`;
const studentDeatilsURL = `${BASE_URL}admin/students`;
const studentUpdateURL = `${BASE_URL}admin/update-student/`;

// TEACHER API ENDPOINTS
const teacherSignUpApiURL = `${BASE_URL}teacher/signup`;

const teacherSignInApiURL = `${BASE_URL}teacher/signin`;

const teacherUpdateDetailsURL = `${BASE_URL}admin/update-teacher/`;

const teacherListURL = `${BASE_URL}admin/teachers`;

const teacherDetailURL = `${BASE_URL}teacher/`;

// CLASS API ENDPOINTS
const classCreateURL = `${BASE_URL}admin/class/create`;
const classListURL = `${BASE_URL}admin/class`;
const classDetailsURL = `${BASE_URL}admin/class`;
const classAssignTeacherURL = `${BASE_URL}admin/class`;
const classDeleteURL = `${BASE_URL}admin/class`;
// Finance Page

const financeMonthlyURL = `${BASE_URL}admin/analytics/financial/monthly`;
const financeYearlyURL = `${BASE_URL}admin/analytics/financial/`;

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
  teacherListURL,
  studentListURL,
  financeMonthlyURL,
  financeYearlyURL,
  classDeleteURL,
  studentDeatilsURL,
  studentUpdateURL,
  teacherDetailURL,
};
