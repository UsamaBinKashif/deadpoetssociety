// This file defines the Mongoose schema and model for the 'user' collection.

const mongoose = require("mongoose");

// Defining the schema for the user collection
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true,
    },
    profile_image: {
      type: String,
      required: true,
    },
  },
  {
    // Adding timestamps to track creation and modification dates
    timestamps: true,
  }
);

// Creating the Mongoose model for the 'user' collection
const USER = mongoose.model("user", userSchema);

module.exports = USER;
