const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    numberOfComments: String,
    user: String,
  },
  {
    versionKey: false,
  }
);

const postModel = mongoose.model("posts", postSchema);

module.exports = { postModel };
