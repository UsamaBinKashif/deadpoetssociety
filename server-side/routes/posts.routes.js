const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { handleCreatePost, handleAddComment, handleDeleteComment } = require("../controllers/post.controllers");

// importing router
const router = express.Router();

router.post("/create-post", protect, handleCreatePost);
router.put("/add-comment", protect, handleAddComment);
router.delete("/del-comment", protect, handleDeleteComment);

module.exports = router;
