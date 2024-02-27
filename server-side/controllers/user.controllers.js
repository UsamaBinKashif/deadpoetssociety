const asyncHandler = require("express-async-handler");

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public

const auth_user = asyncHandler(async (req, res) => {
  res.send("AUTH");
});

module.exports = {
  auth_user,
};
