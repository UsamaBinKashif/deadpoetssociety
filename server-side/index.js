const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const connectToDatabase = require("./configuration/connectToDatabase.js");
//importing routes
const postRoutes = require("./routes/posts.js");
const userRoutes = require("./routes/user.routes.js");

// Initializing Express app
const app = express();

//connecting to databse
connectToDatabase();

// Middleware
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse incoming request bodies in JSON format
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parse incoming requests with URL-encoded payloads
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
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
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
