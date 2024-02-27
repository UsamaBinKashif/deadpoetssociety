const asyncHandler = require("express-async-handler");

// @desc    signin user & get token
// @route   POST /api/users/signin
// @access  Public
const signin = asyncHandler(async (req, res) => {
  res.send("AUTH");
});

// @desc    Register a new user
// @route   POST/api/users/sigup
// @access  Public
const signup = asyncHandler(async (req, res) => {
  res.send("REGISTER");
});

// @desc    Signout user / clear cookie
// @route   POST /api/users/Signout
// @access  Public
const signout = asyncHandler(async (req, res) => {
  res.send("REGISTER");
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserDetails = asyncHandler(async (req, res) => {
  res.send("REGISTER");
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  res.send("REGISTER");
});

module.exports = {
  signin,
  signup,
  signout,
  getUserDetails,
  updateUser,
};
