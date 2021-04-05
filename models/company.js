const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompanySchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  about: { type: String, required: true },
  location: {
    city: String,
    state: String,
    country: String,
    zip: Number,
  },
  employees: { type: Array },
  userId: { type: Number, required: true },
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
