// Imports
require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const passport = require("passport");
require("./config/passport")(passport);

// App Set Up
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// API Routes
app.get('/jargon/', (req, res) => {
  res.json({message: "Welcome to jargon"});
});

app.use('/users', routes.User);
app.use('/companies', routes.Company);
app.use('/companyprofiles', routes.CompanyProfile);
app.use('/groups', routes.Group);
app.use('/post', routes.Post);
app.use('/comments', routes.Comment);
app.use('/userprofiles', routes.UserProfile)

// Server
const server = app.listen(PORT, () =>
  console.log(`Server is running on PORT: ${PORT}`)
);

module.exports = server;