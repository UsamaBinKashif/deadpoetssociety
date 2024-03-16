const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    comment: [
      {
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
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
