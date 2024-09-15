const Student = require("../models/Student");
const Class = require("../models/Class");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.createStudent = async (req, res) => {
  try {
    // Check if a student with the same email already exists
    const existingStudent = await Student.findOne({ email: req.body.email });

    if (existingStudent) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create a new student
    const student = new Student(req.body);

    // Save the student to the database
    await student.save();

    // Update the corresponding class document to include the new student
    if (student.enrolledClass) {
      await Class.findByIdAndUpdate(student.enrolledClass, {
        $addToSet: { studentList: student._id },
      });
    }

    // Respond with the created student data
    res.status(201).json(student);
  } catch (error) {
    console.error("Error creating student:", error.message);

    // Handle duplicate key error (email)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // General error handling
    res
      .status(400)
      .json({ message: "Error creating student", error: error.message });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      "enrolledClass"
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error.message);
    res
      .status(400)
      .json({ message: "Error fetching student", error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { enrolledClass: newClassId, ...updateData } = req.body;

    // Find the student and the previous class
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // If a new class is provided, handle class changes
    if (newClassId) {
      // Find the current class
      const oldClassId = student.enrolledClass;

      // Update the student with new data
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { ...updateData, enrolledClass: newClassId },
        { new: true, runValidators: true }
      );

      // Remove student from the old class if exists
      if (oldClassId && oldClassId !== newClassId) {
        await Class.findByIdAndUpdate(oldClassId, {
          $pull: { studentList: studentId },
        });
      }

      // Add student to the new class
      await Class.findByIdAndUpdate(newClassId, {
        $addToSet: { studentList: studentId },
      });

      res.status(200).json(updatedStudent);
    } else {
      // If no new class ID is provided, just update other fields
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        updateData,
        { new: true, runValidators: true }
      );

      res.status(200).json(updatedStudent);
    }
  } catch (error) {
    console.error("Error updating student:", error.message);
    res
      .status(400)
      .json({ message: "Error updating student", error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Find and delete the student
    const student = await Student.findByIdAndDelete(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Remove student from the class's student list
    const updatedClass = await Class.findByIdAndUpdate(
      student.enrolledClass,
      {
        $pull: { studentList: student._id },
      },
      { new: true } // Return the updated class document
    );

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting student", error: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("enrolledClass");
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res
      .status(400)
      .json({ message: "Error fetching students", error: error.message });
  }
};

exports.signinStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Log email received
    console.log("Email from request body:", email);

    // Check if student exists with that email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Log found student
    console.log("Found student:", student);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, student.password);

    // Log password comparison result
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create and send a JWT token
    console.log("Signing JWT token...");

    const token = jwt.sign(
      {
        id: student._id,
        email: student.email,
        profession: "student",
        name: student.name,
      },
      process.env.PRIVATE_SIGN_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, message: "Logged in successfully" });
  } catch (error) {
    console.error("Error signing in student:", error.message);
    res
      .status(400)
      .json({ message: "Error signing in student", error: error.message });
  }
};
