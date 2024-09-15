const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
    required: [true, "Gender is required"],
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  phone: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  feesPaid: {
    type: Number,
    default: 0,
  },
  enrolledClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  enrollmentDate: {
    type: Date, // Add this to track when the student enrolled
    default: Date.now,
  },
});

// Pre-save hook to hash the password before saving the student document
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const bcrypt = require("bcryptjs");
  this.password = await bcrypt.hash(this.password, 10); // Hash password before saving
  next();
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
