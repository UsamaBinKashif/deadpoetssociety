const asyncHandler = require("express-async-handler");
const POST = require("../models/post.model");
const USER = require("../models/user.model");

// @desc    generate a new post
// @route   POST /api/posts/create-post
// @access  Public
const handleCreatePost = asyncHandler(async (req, res) => {
  const { description, postedBy } = req.body;
  if (!description) {
    res.status(401);
    throw new Error("description is required!");
  }

  // Find the user by the postedBy ID
  const user = await USER.findById(postedBy);

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  // Create the post with the user's image_url and name
  const createdPost = await POST.create({
    description,
    postedBy: {
      user: user._id,
      profile_image: user.profile_image,
      name: user.name,
    },
  });

  if (createdPost) {
    res.status(201).json({ message: "posted!" });
  } else {
    res.status(500).json({ message: "internal server error!" });
  }
});

// @desc    read all the posts inside database
// @route   GET /api/posts/read-all
// @access  Public
const handleReadAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await POST.find();
    if (posts) {
      res.status(201).json({ posts, success: true });
    }
    res.status(404).json({ message: "no posts found!", success: false });
  } catch (err) {
    res.status(500).json({ message: "internal server error!", success: false });
  }
});

// @desc    read single post
// @route   POST /api/posts/read-signlepost
// @access  Public
const handleReadPost = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const post = await POST.findById({ _id: postId });

  try {
    if (post) {
      res.status(201).json(post);
    }
    res.status(404).json({ message: "no post found!" });
  } catch (err) {
    res.status(500).json({ message: "internal server error!" });
  }
});

// @desc    read logged users posts
// @route   POST /api/posts/read-userposts
// @access  Public
const handleReadUserPosts = asyncHandler(async (req, res) => {
  const { postedBy } = req.body;
  try {
    const posts = await POST.find({ postedBy });
    if (posts && posts.length > 0) {
      // Check if posts array is not empty
      res.status(200).json(posts); // Use 200 status for successful response
    } else {
      res.status(404).json({ message: "no posts found!" }); // Send 404 status when no posts are found
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error!" }); // Send 500 status for internal server error
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
    // Assuming User model has a profileImage field
    const user = await USER.findById(commentedBy);

    if (!user) {
      res.status(404).json({ message: "user not found!" });
      return;
    }
    // console.log(user);
    const updatedPost = await POST.findByIdAndUpdate(
      postId,
      {
        $push: {
          comment: {
            text,
            postedBy: {
              user: user._id,
              profile_image: user.profile_image,
              name: user.name,
            },
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
    res.status(500).json({ message: "internal server error!" });
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
    res.status(500).json({ message: "internal server error!" });
  }
});

module.exports = {
  handleCreatePost,
  handleAddComment,
  handleDeleteComment,
  handleReadAllPosts,
  handleReadPost,
  handleReadUserPosts,
};
