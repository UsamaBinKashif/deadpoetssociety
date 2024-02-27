const asyncHandler = require("express-async-handler");
const USER = require("../models/user.model");
const bcrypt = require("bcryptjs");

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
  const { name, email, password } = req.body;

  const userExists = USER.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email Address already exists!");
  }
  const hash = await bcrypt.hash(password, 12);
  const user = await USER.create({ name, email, password: hash });

  if (user) {
    res.status(201).json({ _id: user._id, email: user.email, name: user.name, });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
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
