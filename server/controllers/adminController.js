const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class = require("../models/Class");

// Controller for fetching total count of students and teachers
exports.getTotalCount = async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    const teacherCount = await Teacher.countDocuments();
    res.status(200).json({ studentCount, teacherCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total count", error });
  }
};

// Controller for updating student details
exports.updateStudentById = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating student", error: error.message });
  }
};

// Controller for updating teacher details
exports.updateTeacherById = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.teacherId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating teacher", error: error.message });
  }
};

// Controller for fetching all students (excluding passwords)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .select("-password")
      .populate("enrolledClass", "classGrade")
      .exec();

    // Map through students and return only necessary details including class name
    const studentDetails = students.map((student) => {
      return {
        id: student._id,
        studentName: student.name,
        gender: student.gender,
        dob: student.dob,
        phone: student.phone,
        email: student.email,
        feesPaid: student.feesPaid,
        enrollmentDate: student.enrollmentDate,

        enrolledClass: student.enrolledClass ? student.enrolledClass : null,
      };
    });

    res.status(200).json(studentDetails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// Controller for fetching all teachers (excluding passwords)
exports.getAllTeachers = async (req, res) => {
  try {
    // Fetch teachers
    const teachers = await Teacher.find().select("-password");

    // Replace subjectId and classId with subjectName and classGrade
    const updatedTeachers = await Promise.all(
      teachers.map(async (teacher) => {
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
              subject: { name: subjectData.subjectName, _id: subjectData._id },
              class: { name: classData.classGrade, _id: classData._id },
            };
          }
        );

        const assignedSubjects = await Promise.all(assignedSubjectsPromises);

        return {
          ...teacher.toObject(),
          assignedSubjects,
        };
      })
    );

    res.status(200).json(updatedTeachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
  }
};

// Get students enrolled per month in a given year
exports.getMonthlyEnrollmentAnalytics = async (req, res) => {
  try {
    const { year } = req.params; // Pass year from request params
    console.log(year);

    // Aggregate students by month and count enrollments
    const analytics = await Student.aggregate([
      {
        $match: {
          enrollmentDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$enrollmentDate" },
          studentCount: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by month
      },
    ]);

    res.status(200).json({
      status: "success",
      data: analytics,
    });
  } catch (error) {
    console.error("Error getting monthly enrollment analytics:", error.message);
    res
      .status(400)
      .json({ message: "Error getting analytics", error: error.message });
  }
};

// Get students enrolled per year
exports.getYearlyEnrollmentAnalytics = async (req, res) => {
  try {
    // Aggregate students by year and count enrollments
    const analytics = await Student.aggregate([
      {
        $group: {
          _id: { $year: "$enrollmentDate" },
          studentCount: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by year
      },
    ]);

    res.status(200).json({
      status: "success",
      data: analytics,
    });
  } catch (error) {
    console.error("Error getting yearly enrollment analytics:", error.message);
    res
      .status(400)
      .json({ message: "Error getting analytics", error: error.message });
  }
};

// Controller for getting total salary of teachers per month or year
exports.getTeacherSalaryAnalytics = async (req, res) => {
  try {
    const { period, year } = req.params; // period can be 'monthly' or 'yearly'

    // Define the date range based on the period
    const matchStage =
      period === "monthly"
        ? {
            $match: {
              salaryDate: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`),
              },
            },
          }
        : {
            $match: {
              salaryDate: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`),
              },
            },
          };

    const groupStage =
      period === "monthly"
        ? {
            $group: {
              _id: { $month: "$salaryDate" },
              totalSalary: { $sum: "$salary" },
            },
          }
        : {
            $group: {
              _id: { $year: "$salaryDate" },
              totalSalary: { $sum: "$salary" },
            },
          };

    const analytics = await Teacher.aggregate([
      matchStage,
      groupStage,
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      status: "success",
      data: analytics,
    });
  } catch (error) {
    console.error("Error getting teacher salary analytics:", error.message);
    res
      .status(400)
      .json({ message: "Error getting analytics", error: error.message });
  }
};

// Controller for calculating total income, total investment, and profit
exports.getFinancialAnalytics = async (req, res) => {
  try {
    const { period, year } = req.params;

    // Match stage for income calculation (fees paid by students)
    const incomeMatchStage = {
      $match: {
        enrollmentDate: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    };

    // Group stage for income, based on period
    const incomeGroupStage =
      period === "monthly"
        ? {
            $group: {
              _id: { $month: "$enrollmentDate" },
              totalIncome: { $sum: "$feesPaid" },
            },
          }
        : {
            $group: {
              _id: { $year: "$enrollmentDate" },
              totalIncome: { $sum: "$feesPaid" },
            },
          };

    const totalIncome = await Student.aggregate([
      incomeMatchStage,
      incomeGroupStage,
      { $sort: { _id: 1 } },
    ]);

    // Calculate total investment by summing up the salary of all teachers
    const totalInvestmentData = await Teacher.aggregate([
      {
        $group: {
          _id: null, // We are not grouping by date; just summing the salaries
          totalInvestment: { $sum: "$salary" },
        },
      },
    ]);

    const totalInvestment = totalInvestmentData.length
      ? totalInvestmentData[0].totalInvestment
      : 0;

    // Map the profit calculation for each period
    const profit = totalIncome.map((income) => ({
      period: income._id,
      totalIncome: income.totalIncome,
      totalInvestment: totalInvestment, // Since we don't have monthly investment, use the total
      profit: income.totalIncome - totalInvestment,
    }));

    res.status(200).json({
      status: "success",
      data: profit,
    });
  } catch (error) {
    console.error("Error getting financial analytics:", error.message);
    res.status(400).json({
      message: "Error getting financial analytics",
      error: error.message,
    });
  }
};

// Controller for getting yearly financial analytics
exports.getYearlyFinancialAnalytics = async (req, res) => {
  try {
    // Calculate total income (sum of fees paid by all students) grouped by year
    const totalIncomeByYear = await Student.aggregate([
      {
        $group: {
          _id: { $year: "$enrollmentDate" }, // Group by year
          totalIncome: { $sum: "$feesPaid" },
        },
      },
    ]);

    // Calculate total investment (sum of salaries paid to teachers) grouped by year
    const totalInvestmentByYear = await Teacher.aggregate([
      {
        $group: {
          _id: { $year: "$enrollmentDate" },

          totalInvestment: { $sum: "$salary" },
        },
      },
    ]);

    // Create a dictionary to store the results
    const resultByYear = {};

    // Add total income to the dictionary
    totalIncomeByYear.forEach((item) => {
      const year = item._id;
      resultByYear[year] = {
        totalIncome: item.totalIncome,
        totalInvestment: 0, // Default value, to be updated
        profit: 0, // Default value, to be updated
      };
    });

    // Add total investment to the dictionary
    totalInvestmentByYear.forEach((item) => {
      const year = item._id;
      if (resultByYear[year]) {
        resultByYear[year].totalInvestment = item.totalInvestment;
        resultByYear[year].profit =
          resultByYear[year].totalIncome - item.totalInvestment;
      }
    });

    // Convert the dictionary to an array
    const result = Object.keys(resultByYear).map((year) => ({
      year,
      ...resultByYear[year],
    }));

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Error getting yearly financial analytics:", error.message);
    res.status(400).json({
      message: "Error getting yearly financial analytics",
      error: error.message,
    });
  }
};
