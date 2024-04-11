const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    // Description of the post
    description: {
      type: String,
      required: true,
    },
    // Information about the user who posted the content
    postedBy: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      // Additional fields to include from the user model
      profile_image: String,
      name: String,
    },
    // Array of comments on the post
    comment: [
      {
        // Text of the comment
        text: String,
        // Timestamp of when the comment was created
        created: { type: Date, default: Date.now },
        // Information about the user who posted the comment
        postedBy: {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
          },
          // Additional fields to include from the user model
          profile_image: String,
          name: String,
        },
      },
    ],
  },
  {
    // Adding timestamps to track creation and modification dates
    timestamps: true,
  }
);
// Creating the Mongoose model for the 'user' collection
const POST = mongoose.model("post", postSchema);

module.exports = POST;
