const express = require("express");
const adminController = require("../controllers/adminController");
const validateClass = require("../middlewares/validateClass");
const classController = require("../controllers/classController");

const router = express.Router();

// Route 1: Get total number of students and teachers
router.get("/total-count", adminController.getTotalCount);

// Route 2: Update student details
router.put("/update-student/:studentId", adminController.updateStudentById);

// Route 3: Update teacher details
router.put("/update-teacher/:teacherId", adminController.updateTeacherById);

// Route 4: Access the list of students excluding password
router.get("/students", adminController.getAllStudents);

// Route 5: Access the list of teachers excluding password
router.get("/teachers", adminController.getAllTeachers);
// Monthly analytics for a specific year
// Enrollment analytics
router.get(
  "/analytics/enrollment/monthly/:year",
  adminController.getMonthlyEnrollmentAnalytics
);
router.get(
  "/analytics/enrollment/yearly",
  adminController.getYearlyEnrollmentAnalytics
);

// Teacher salary analytics
router.get(
  "/analytics/salary/:period/:year",
  adminController.getTeacherSalaryAnalytics
);

// Financial analytics
router.get(
  "/analytics/financial/:period/:year",
  adminController.getFinancialAnalytics
);
// Financial analytics
router.get(
  "/analytics/financial/",
  adminController.getYearlyFinancialAnalytics
);

// Handle Classes

router.post("/class/create", validateClass, classController.createClass); // Create Class
router.get("/class/:id", classController.getClassById); // Get Class by ID
router.get("/class", classController.getAllClasses); // Get all Classes
router.put("/class", classController.assignSubjectToTeacher); // Update Class by ID
router.delete("/class/:id", classController.deleteClassById); // Delete Class by ID

module.exports = router;
