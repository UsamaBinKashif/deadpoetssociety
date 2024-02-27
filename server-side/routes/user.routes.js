const express = require("express");
const {
  signup,
  signin,
  signout,
  getUserDetails,
  updateUser,
} = require("../controllers/user.controllers");

// Creating an instance of Express Router
const router = express.Router();

// Route for user signup
router.post("/signup", signup);

// Route for user signin
router.post("/signin", signin);

// Route for user signout
router.post("/signout", signout);

// Route for getting and updating user profile
router.route("/profile").get(getUserDetails).put(updateUser);

module.exports = router;
