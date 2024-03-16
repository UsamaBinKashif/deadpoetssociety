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

module.exports = {
  handleCreatePost,
};
