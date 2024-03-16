const asyncHandler = require("express-async-handler");
const POST = require("../models/post.model");

const handleCreatePost = asyncHandler(async (req, res) => {
  // console.log("Post=>", req.body);
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
      res.status(404).json({ message: "Post not found!" });
      return;
    }

    res
      .status(201)
      .json({ message: "Comment added successfully!", post: updatedPost });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("internal server error!");
  }
});

module.exports = {
  handleCreatePost,
  handleAddComment,
};
