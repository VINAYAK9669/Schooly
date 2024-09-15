const Teacher = require("../models/Teacher.js");
const Class = require("../models/Class.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign up controller
exports.signup = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user already exists
    let user = await Teacher.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new Teacher(req.body);
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Sign in controller
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await Teacher.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, profession: "teacher", name: user.name },
      process.env.PRIVATE_SIGN_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Update teacher to assign them to a subject
exports.assignSubjectToTeacher = async (req, res) => {
  const { userId } = req.params; // Teacher's ID
  const { classId, subjectId } = req.body; // IDs for the class and the subject

  try {
    // Find the teacher by ID
    const teacher = await Teacher.findById(userId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find the class by ID and ensure the subject exists in classDetails
    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    const subject = classData.classDetails.find(
      (detail) => detail._id.toString() === subjectId
    );

    if (!subject) {
      return res.status(404).json({ message: "Subject not found in class" });
    }

    // Check if the subject is already assigned
    if (subject.assignedTo) {
      return res
        .status(400)
        .json({ message: "Subject already assigned to a teacher" });
    }

    // Update the assignedSubjects field in the Teacher model
    teacher.assignedSubjects.push({ subjectId, classId });

    // Update the assignedTo field in classDetails
    subject.assignedTo = teacher.name;

    // Save the updated teacher and class
    await teacher.save();
    await classData.save();

    res
      .status(200)
      .json({ message: "Subject assigned to teacher successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get teacher details by ID
// Get teacher details by ID
// Get teacher details by ID
exports.getTeacherDetails = async (req, res) => {
  const { id } = req.params; // Teacher's ID

  try {
    // Find the teacher by ID
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Retrieve assigned subjects' details
    const assignedSubjectsPromises = teacher.assignedSubjects.map(
      async (assignment) => {
        const classData = await Class.findById(assignment.classId);
        if (!classData) {
          return { subjectName: null, className: null };
        }

        const subjectData = classData.classDetails.id(assignment.subjectId);
        if (!subjectData) {
          return { subjectName: null, className: classData.classGrade };
        }

        return {
          subjectName: subjectData.subjectName,
          className: classData.classGrade,
        };
      }
    );

    // Wait for all the promises to resolve
    const assignedSubjects = await Promise.all(assignedSubjectsPromises);

    // Format the response
    const formattedTeacher = {
      ...teacher.toObject(),
      assignedSubjects,
    };

    res.status(200).json({
      status: "success",
      data: formattedTeacher,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
