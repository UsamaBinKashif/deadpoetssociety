const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const generateToken = (res, user_id) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    }).send()

    return token
};

module.exports = generateToken;
