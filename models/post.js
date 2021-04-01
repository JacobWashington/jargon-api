const mongoose = require("mongoose");
const { Schema } = mongoose;

const Comment = require("./comment");

const PostSchema = new Schema({
  userId: { type: Number, required: true },
  content: { type: String, requied: true, minLength: 1, maxLength: 5000 },
  comments: [Comment],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
