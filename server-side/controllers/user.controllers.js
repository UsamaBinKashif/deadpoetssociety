const asyncHandler = require("express-async-handler");
const USER = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/authService");

// @desc    signin user & get token
// @route   POST /api/users/signin
// @access  Public
const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await USER.findOne({ email });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401);
    throw new Error("Invalid email or password!");
  }

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password!");
  } else {
    generateToken(res, user._id);
    const userBase64 = Buffer.from(JSON.stringify(user)).toString("base64");
    res.status(201).json({ message: "Signed in", userBase64 });
  }
});

// @desc    Register a new user
// @route   POST/api/users/sigup
// @access  Public
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await USER.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email Address already exists!");
  }
  const hash = await bcrypt.hash(password, 12);
  const user = await USER.create({ name, email, password: hash });

  if (user) {
    res.status(201).json({
      message: "Signed up successfully!",
      // user: { _id: user._id, email: user.email, name: user.name },
    });
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
