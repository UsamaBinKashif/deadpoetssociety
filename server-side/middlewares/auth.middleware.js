const asyncHandler = require("express-async-handler");
const USER = require("../models/user.model");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      req.user = await USER.findById(decoded.userId);
      next();
    } catch (error) {
      res.status(401).send('Not authorized, token failed');
    }
  } else {
    res.status(401).send('Not authorized, token failed');
  }
});

module.exports = { protect };