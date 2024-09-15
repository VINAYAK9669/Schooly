const express = require("express");
const validateStudent = require("../middlewares/validateStudent");
const {
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  signinStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/create", validateStudent, createStudent);
router.get("/:studentId", getStudent);
router.put("/:studentId", updateStudent);
router.delete("/:studentId", deleteStudent);
router.get("/", getAllStudents);
router.post("/signin", signinStudent); // Sign-in route

module.exports = router;
