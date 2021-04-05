require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_URL } = process.env;

const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose
  .connect(MONGO_URL, configOptions)
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((err) => console.log("MongoDB connection error:", err));


module.exports = {
  CommentSchema: require('./comment'),
  Company: require('./company'),
  CompanyProfile: require('./companyProfile'),
  Experience: require('./experience'),
  Group: require('./group'),
  PostSchema: require('./post'),
  User: require('./user'),
  UserProfile: require('./userProfile')
};