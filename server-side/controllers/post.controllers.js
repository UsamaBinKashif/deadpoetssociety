const asyncHandler = require("express-async-handler");
const POST = require("../models/post.model");

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
};
