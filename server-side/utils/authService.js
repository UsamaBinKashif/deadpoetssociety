const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Change to 7 days
  });

  return token;
};

module.exports = generateToken;
