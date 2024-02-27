const express = require("express");
const {

  signup,
  signin,
  signout,
  getUserDetails,
  updateUser,
} = require("../controllers/user.controllers");
// importing router
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.route("/profile").get(getUserDetails).put(updateUser);

module.exports = router;
