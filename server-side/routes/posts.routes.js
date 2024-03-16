const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { handleCreatePost, handleAddComment } = require("../controllers/post.controllers");

// importing router
const router = express.Router();

router.post("/create-post", protect, handleCreatePost);
router.post("/add-comment", protect, handleAddComment);

module.exports = router;
