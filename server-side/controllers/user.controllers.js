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

    res.status(201).json({
      message: "Signed in",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profile_image: user.profile_image,
      },
    });
  }
});

// @desc    Register a new user
// @route   POST/api/users/sigup
// @access  Public
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await USER.findOne({ email });
  const userImage = `https://source.boringavatars.com/beam/100/${name}?colors=FF8900,00000,00000,FF8900,000000`;
  if (userExists) {
    res.status(400);
    throw new Error("Email Address already exists!");
  }
  const hash = await bcrypt.hash(password, 12);
  const user = await USER.create({
    name,
    email,
    password: hash,
    profile_image: userImage,
  });

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
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(201).json({ message: "Signed out!" });
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
  const user = await USER.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    if (req.body.name) {
      const userImage = `https://source.boringavatars.com/beam/100/${req.body.name}?colors=FF8900,00000,00000,FF8900,000000`;
      user.profile_image = userImage;
    }
    if (req.body.password) {
      const hash = await bcrypt.hash(req.body.password, 12);
      user.password = hash;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      message: "Updated user profile!",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        profile_image: updatedUser.profile_image,
      },
    });
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});

module.exports = {
  signin,
  signup,
  signout,
  getUserDetails,
  updateUser,
};
