const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

// Define the schema
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); // Validates for a 10-digit number
      },
      message: "Please provide a valid 10-digit mobile number",
    },
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
    required: [true, "Gender is required"],
  },
  salary: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  assignedSubjects: [
    {
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class.classDetails._id", // Referencing subject IDs in classDetails
        required: [true, "Assigned subject ID is required"],
      },
      classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: [true, "Class ID is required"],
      },
    },
  ],
});

// Hash password before saving user
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
