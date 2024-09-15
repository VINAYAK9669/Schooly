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
    const students = await Student.find().select("-password");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// Controller for fetching all teachers (excluding passwords)
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().select("-password");
    res.status(200).json(teachers);
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

    // Calculate total income (assuming it's the sum of fees paid by all students)
    const incomeMatchStage =
      period === "monthly"
        ? {
            $match: {
              enrollmentDate: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`),
              },
            },
          }
        : {
            $match: {
              enrollmentDate: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31`),
              },
            },
          };

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

    // Calculate total investment (total salary paid to teachers)
    const salaryMatchStage =
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

    const salaryGroupStage =
      period === "monthly"
        ? {
            $group: {
              _id: { $month: "$salaryDate" },
              totalInvestment: { $sum: "$salary" },
            },
          }
        : {
            $group: {
              _id: { $year: "$salaryDate" },
              totalInvestment: { $sum: "$salary" },
            },
          };

    const totalInvestment = await Teacher.aggregate([
      salaryMatchStage,
      salaryGroupStage,
      { $sort: { _id: 1 } },
    ]);

    // Calculate profit
    const profit = totalIncome.map((income, index) => ({
      period: income._id,
      totalIncome: income.totalIncome,
      totalInvestment: totalInvestment[index]?.totalInvestment || 0,
      profit:
        income.totalIncome - (totalInvestment[index]?.totalInvestment || 0),
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
