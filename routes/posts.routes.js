const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const {
  handleCreatePost,
  handleAddComment,
  handleDeleteComment,
  handleReadAllPosts,
  handleReadPost,
  handleReadUserPosts,
} = require("../controllers/post.controllers");

// importing router
const router = express.Router();

router.post("/create-post", protect, handleCreatePost);
router.put("/add-comment", protect, handleAddComment);
router.delete("/del-comment", protect, handleDeleteComment);
router.get("/read-all", protect, handleReadAllPosts);
router.post("/read-singlepost", protect, handleReadPost);
router.post("/read-userposts", protect, handleReadUserPosts);

module.exports = router;
