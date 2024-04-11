const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./configuration/connectToDatabase.js");
//importing routes
const postRoutes = require("./routes/posts.routes.js");
const userRoutes = require("./routes/user.routes.js");

// Initializing Express app
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://dpsapi.vercel.app/","https://deadpoetssociety.vercel.app/"], // Allow this origin to send requests
    credentials: true, // Allow cookies and authorization headers
  })
); //Enable Cross-Origin Resource Sharing (CORS)

//connecting to databse
connectToDatabase();

// Middleware
dotenv.config();
app.use(cookieParser()); // Parse the cookies
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse incoming request bodies in JSON format
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parse incoming requests with URL-encoded payloads
app.use(helmet()); // Set various HTTP headers for security

// Routes
app.get("/", (req, res) => {
  res.send("Welcome To The Dead Poets Society.");
});

// Route for posts
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

// Handling out-of-scope URLs
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ success: false, message: `requested route(${req.url}) not found` }); // Responding with a 404 status and a message for any other routes not defined
});

// Error handling middleware
app.use((err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // If Mongoose not found error, set to 404 and change message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
