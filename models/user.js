const mongoose = require("mongoose");
const { Schema } = mongoose;

const Experience = require("./experience");

const EmploymentData = require("./employmentData");

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 8 },
  headline: { type: String, minLength: 20, maxLength: 280 },
  bio: { type: String, minLength: 20, maxLength: 1000 },
  admin: { type: Boolean, required: true },
  connections: { type: Array },
  employmentData: {
    employer: { type: Number, required: true },
    jobTitle: { type: String, required: true },
    dateStart: { type: Date, required: true },
  },
  experience: [Experience],
  location: {
    city: String,
    state: String,
    country: String,
    zip: Number,
  },
  active: { type: Boolean, default: true },
  created: { type: Date, default: Date.now() },
  updated: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
