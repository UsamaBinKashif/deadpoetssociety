const express = require("express");
const { auth_user } = require("../controllers/user.controllers");
// importing router
const router = express.Router();

router.post("/signup", auth_user);

module.exports = router;
