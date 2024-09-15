const { body, validationResult } = require("express-validator");

const validateStudent = [
  body("name").notEmpty().withMessage("Name is required").trim(),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["MALE", "FEMALE"])
    .withMessage("Invalid gender"),

  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isDate()
    .withMessage("Invalid date format"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .matches(/^[0-9]+$/)
    .withMessage("Phone number must be numeric"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("feesPaid")
    .optional()
    .isNumeric()
    .withMessage("Fees paid must be a number"),

  body("enrolledClass")
    .notEmpty()
    .withMessage("Class is required")
    .isMongoId()
    .withMessage("Invalid class ID"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateStudent;
