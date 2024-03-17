const asyncHandler = require("express-async-handler");
const POST = require("../models/post.model");

// @desc    generate a new post
// @route   POST /api/posts/create-post
// @access  Public
const handleCreatePost = asyncHandler(async (req, res) => {
  const { description, postedBy } = req.body;
  if (!description) {
    res.status(401);
    throw new Error("description is required!");
  }

  const createdPost = await POST.create({ description, postedBy });

  if (createdPost) {
    res.status(201).json({ message: "posted!" });
  } else {
    res.status(500);
    throw new Error("internal server error!");
  }
});

// @desc    read all the posts inside database
// @route   GET /api/posts/read-all
// @access  Public
const handleReadAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await POST.find();
    if (posts) {
      res.status(201).json(posts);
    }
    res.status(404).json({ message: "no posts found!" });
  } catch (err) {
    res.status(500);
    throw new Error("internal server error!");
  }
});

// @desc    read single post
// @route   POST /api/posts/read-all
// @access  Public
const handleReadPost = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  try {
    const post = await POST.findById({ postId });
    if (post) {
      res.status(201).json(posts);
    }
    res.status(404).json({ message: "no post found!" });
  } catch (err) {
    res.status(500);
    throw new Error("internal server error!");
  }
});

// @desc    add a comment on post
// @route   PUT /api/posts/add-comment
// @access  Public
const handleAddComment = asyncHandler(async (req, res) => {
  const { postId, text, commentedBy } = req.body;

  if (!postId || !text || !commentedBy) {
    res.status(400).json({ message: "all fields are required!" });
    return;
  }
  try {
    const updatedPost = await POST.findByIdAndUpdate(
      postId,
      {
        $push: {
          comment: {
            text,
            postedBy: commentedBy, // Assuming 'postedBy' is the user who commented
          },
        },
      },
      { new: true } // To return the updated post
    );
    if (!updatedPost) {
      res.status(404).json({ message: "post not found!" });
      return;
    }

    res.status(201).json({ message: "commented!", post: updatedPost });
  } catch (error) {
    res.status(500);
    throw new Error("internal server error!");
  }
});

// @desc    delete comment, user who owns the post and user who has commented can only perform this/
// @route   DELETE /api/posts/del-comment
// @access  Public
const handleDeleteComment = asyncHandler(async (req, res) => {
  const { postId, commentId, postedBy, commentedBy } = req.body;

  try {
    // Find the post by postId
    const post = await POST.findById(postId);

    if (!post) {
      res.status(404).json({ message: "post not found!" });
      return;
    }
    const commentIndex = post.comment.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    const comment = post.comment[commentIndex];

    // // Check if the user is the owner of the post or the commenter
    if (
      post.postedBy.toString() !== postedBy &&
      comment.postedBy.toString() !== commentedBy
    ) {
      res
        .status(403)
        .json({ message: "you are not authorized to delete this comment!" });
      return;
    }

    // // If authorized, delete the comment
    post.comment.splice(commentIndex, 1);
    await post.save();

    res.status(200).json({ message: "comment deleted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = {
  handleCreatePost,
  handleAddComment,
  handleDeleteComment,
  handleReadAllPosts,
};
