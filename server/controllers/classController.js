const Class = require("../models/Class");
const Teacher = require("../models/Teacher");

// Create a new class
exports.createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.status(201).json({
      status: "success",
      data: newClass,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get class by ID
exports.getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id).populate(
      "studentList"
    );
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({
      status: "success",
      data: classData,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("studentList");
    res.status(200).json({
      status: "success",
      data: classes,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.assignSubjectToTeacher = async (req, res) => {
  const { classId, subjectId, teacherId } = req.body;

  try {
    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find the class by ID and check if the subject exists in classDetails
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
    if (subject.assignedTo.teacherId) {
      return res.status(400).json({
        message: `Subject already assigned to teacher ${subject.assignedTo.teacherName}`,
      });
    }

    // Update the assignedTo field in classDetails with teacher's _id and name
    subject.assignedTo = {
      teacherId: teacher._id,
      teacherName: teacher.name, // Assuming the teacher's name is stored in the 'name' field
    };

    // Add this subject to the teacher's assignedSubjects array
    const isSubjectAlreadyAssigned = teacher.assignedSubjects.some(
      (assignedSubject) => assignedSubject.subjectId.toString() === subjectId
    );

    if (!isSubjectAlreadyAssigned) {
      teacher.assignedSubjects.push({ subjectId, classId });
    }

    // Save the updated teacher and class data
    await teacher.save();
    await classData.save();

    res.status(200).json({
      message: "Subject assigned to teacher successfully",
      classData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete class by ID
exports.deleteClassById = async (req, res) => {
  try {
    const classId = req.params.id;

    // Check if the class exists and if it has students enrolled
    const classData = await Class.findById(classId).populate("studentList");

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (classData.studentList.length > 0) {
      return res.status(400).json({
        message:
          "Class cannot be deleted because there are students enlisted under it",
      });
    }

    // Proceed with class deletion
    await Class.findByIdAndDelete(classId);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting class:", error.message);
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
