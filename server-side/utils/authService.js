const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const generateToken = (res, user_id, callback) => {
  const userIdString = user_id.toString(); // Convert ObjectId to string

  let token = jwt.sign({ userIdString }, "6CaeS80u6avrzqL0");
  return token
};

module.exports = generateToken;
