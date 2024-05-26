const asyncHandler = require("express-async-handler");
const USER = require("../models/user.model");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt; // Access the 'jwt' cookie
  console.log(req.cookies.jwt);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await USER.findById(decoded.userId);
      next();
    } catch (error) {
      res.status(401).send('Not authorized, token failed');
    }
  } else {
    // Move the next() call inside the else block
    next();
  }
});

module.exports = { protect };
