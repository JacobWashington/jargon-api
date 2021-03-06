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

app.use('/jargon/users', routes.User);
app.use('/jargon/companies', routes.Company);
app.use('/jargon/companies/:id', routes.CompanyProfile);
app.use('/jargon/groups', routes.Group);
app.use('/jargon/posts', routes.Post);
app.use('/jargon/comments', routes.Comment);
app.use('/jargon/userprofiles', routes.UserProfile);

// Server
const server = app.listen(PORT, () =>
  console.log(`Server is running on PORT: ${PORT}`)
);

module.exports = server;