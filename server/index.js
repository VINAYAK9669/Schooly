const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors"); // Import CORS module
const errorHandler = require("./middlewares/errorHandler.js");
const teacherRoute = require("./routes/teacherRoute.js");
const studentRoute = require("./routes/studentRoute.js");
const adminRouter = require("./routes/adminRouter.js");

// TODO: 2] Create a instance of express and declare port
const app = express();
const PORT = 10000;

// Enable CORS
app.use(cors());

app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on the port : ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connnected to mahgoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MagoDb");
  });

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/health", (req, res) => {
  res.json({
    message: "Working Fine",
  });
});
// TODO: 6] Use the defined routes
app.use("/teacher", teacherRoute);
app.use("/students", studentRoute);
app.use("/admin", adminRouter);

app.use(errorHandler);
