const { body, validationResult } = require("express-validator");

const validateClass = [
  body("classGrade")
    .notEmpty()
    .withMessage("Class name is required")
    .trim()
    .escape(),

  body("classDetails")
    .isArray({ min: 1 })
    .withMessage("Class details must contain at least one subject"),

  body("classDetails.*.subjectName")
    .notEmpty()
    .withMessage("Subject name is required")
    .trim()
    .escape(),

  body("classDetails.*.assignedTo").optional().trim().escape(),

  // Updated validation for 'year' to match format 'YYYY-YYYY'
  body("year")
    .matches(/^\d{4}-\d{4}$/)
    .withMessage("Year must be in the format YYYY-YYYY (e.g., 2023-2024)")
    .custom((value) => {
      const [startYear, endYear] = value.split("-").map(Number);
      if (endYear - startYear !== 1) {
        throw new Error(
          "End year must be exactly 1 year greater than the start year"
        );
      }
      return true;
    }),

  body("studentFees").isNumeric().withMessage("Student fees must be a number"),

  body("studentList")
    .optional()
    .isArray()
    .withMessage("Student list must be an array"),

  // Middleware to check validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateClass;
