const mongoose = require("mongoose");
const { Schema } = mongoose;

const Post = require("./post");

const GroupSchema = new Schema({
  userId: { type: Number, required: true },
  name: { type: String, required: true, minLength: 1, maxLength: 75 },
  members: { type: Array },
  description: { type: String, required: true, minLength: 20, maxLength: 1000 },
  houseRules: { type: String, maxLength: 5000 },
  posts: [Post],
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
