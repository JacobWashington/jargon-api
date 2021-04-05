const mongoose = require("mongoose");
const { Schema } = mongoose;
const Post = require("./post");

const CompanyProfileSchema = new Schema({
  companyId: { type: String, required: true },
  posts: [Post.schema],
  admin: { type: Array },
});

const CompanyProfile = mongoose.model("CompanyProfile", CompanyProfileSchema);

module.exports = CompanyProfile;
