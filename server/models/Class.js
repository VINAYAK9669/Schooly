const mongoose = require("mongoose");

// Define the schema for class details (subjects)
const classDetailSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: [true, "Subject name is required"],
  },
  assignedTo: {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },
    teacherName: {
      type: String,
      default: null,
    },
  },
});

// Define the main Class schema
const classSchema = new mongoose.Schema({
  classGrade: {
    type: String,
    required: [true, "Class grade is required"],
    trim: true,
  },
  classDetails: {
    type: [classDetailSchema], // Array of class details (subjects)
    required: true,
  },
  year: {
    type: String, // Ensure year is a string
    required: [true, "Year is required"],
    match: [
      /^\d{4}-\d{4}$/,
      "Year must be in the format YYYY-YYYY (e.g., 2023-2024)",
    ],
  },
  studentFees: {
    type: Number,
    required: [true, "Student fees are required"],
  },
  studentList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference to Student model
    },
  ],
});

// Create the Class model
const Class = mongoose.model("Class", classSchema);

module.exports = Class;
