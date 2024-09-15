const { check, validationResult } = require("express-validator");

const validateTeacher = [
  // Validate 'name' field
  check("name").notEmpty().withMessage("Name is required").trim(),

  // Validate 'email' field
  check("email").isEmail().withMessage("Email is invalid"),

  // Validate 'mobileNumber' field
  check("mobileNumber")
    .notEmpty()
    .withMessage("Mobile number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be 10 digits")
    .matches(/^[0-9]+$/)
    .withMessage("Mobile number must be numeric"),

  // Validate 'dob' field
  check("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isDate()
    .withMessage("Invalid date format"),

  // Validate 'gender' field
  check("gender")
    .isIn(["MALE", "FEMALE"])
    .withMessage("Gender must be either MALE or FEMALE"),

  // Validate 'salary' field (optional, if provided)
  check("salary").optional().isNumeric().withMessage("Salary must be a number"),

  // Validate 'password' field
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  // Middleware to handle errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateTeacher;
