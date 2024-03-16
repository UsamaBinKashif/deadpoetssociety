const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { handleCreatePost } = require("../controllers/post.controllers");

// importing router
const router = express.Router();

router.post("/create-post", protect, handleCreatePost);

module.exports = router;
