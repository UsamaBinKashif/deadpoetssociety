const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const USER = require("../models/user.model");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await USER.findById(decoded.user_id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not autherized, invalid token!");
    }
  } else {
    res.status(401);
    throw new Error("Not autherized, token not found!");
  }
});

module.exports = {protect};
