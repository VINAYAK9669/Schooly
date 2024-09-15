const express = require("express");

const validateTeacher = require("../middlewares/validateTeacher.js");
const verifyToken = require("../middlewares/verifyToken.js");

const {
  signup,
  signin,
  assignSubjectToTeacher,
  getTeacherDetails,
} = require("../controllers/teacherController.js");

const router = express.Router();
// TODO: 2]
router.get("/health", (req, res) => {
  res.json({
    message: "User Route is working fine",
    status: "Working",
  });
});

// TODO: 3]
router.post("/signup", validateTeacher, signup);

// TODO:4] Create a Login Route
router.post("/signin", signin);

// TODO: 5] Update Route
router.put("/update/:userId", verifyToken, assignSubjectToTeacher);

// Route to get teacher details
router.get("/:id", getTeacherDetails);

module.exports = router;
