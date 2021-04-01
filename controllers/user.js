// Imports
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const db = require("../models");

const register = (req, res) => {
  console.log(">>>>> Inside of /register");
  console.log(">>>>> req.body");
  console.log(req.body);

  db.User.findOne({ email: req.body.email })
    .then((user) => {
      // if email already exist, a user will come back
      if (user) {
        // send a 400 response
        return res.status(400).json({ message: "Email already exists ⛔️" });
      } else {
        // Create new user if no existing user
        const newUser = new db.User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        });

        // Salt and hash the password - before saving the user
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw Error;

          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.log(">>>>> Error inside of hash", err);
            // Change the password in newUser to the hash
            newUser.password = hash;
            newUser
              .save() // save the user to the database
              .then((createdUser) => res.json(createdUser))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log("Error finding user", err));
};

const show = (req, res) => {
  // Purpose: Fetch one user from DB and return
  // console.log("=====> Inside GET /user/:id");
  // console.log("=====> req.params");
  // console.log(req.params); // object used for finding user by id
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) console.log("Error in user#show:", err);
    res.json(foundUser);
  });
};

const login = async (req, res) => {
  // POST - finding a user and returning the user
  console.log(">>>>> Inside of /login");
  console.log(">>>>> /login -> req.body");
  console.log(req.body);

  const foundUser = await db.User.findOne({ email: req.body.email });

  if (foundUser) {
    // user is in the DB
    let isMatch = await bcrypt.compare(req.body.password, foundUser.password);
    console.log(isMatch);
    if (isMatch) {
      // if user matched, then send a JSON Web Token
      // Create a token payload
      // add an expiredToken = Date.now()
      // save the user
      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
      };
      // use the sign function with payload created and the web token secret created in .env
      // expiresIn is to set the session to be over in an hour, can also write in { expiresIn: '1hr' }
      jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          res
            .status(400)
            .json({ message: "Session has ended, please log in again" });
        }
        const legit = jwt.verify(token, JWT_SECRET, { expiresIn: 60 });
        console.log(legit);
        res.json({ success: true, token: `Bearer ${token}`, userData: legit });
      });
    } else {
      return res
        .status(400)
        .json({ message: "Email or Password is incorrect ⛔️" });
    }
  } else {
    return res.status(400).json({ message: "User not found ⚠️" });
  }
};

const updateUser = async (req, res) => {
  try {
    const firstName = await req.body.firstName;
    const lastName = await req.body.lastName;
    const headline = await req.body.headline;
    const bio = await req.body.bio;
    const admin = await req.body.bio;
    const location = await req.body.bio;
    const userId = await req.user.id;
    const active = await req.user.active;
    const experience = await req.user.experience;
    const filter = { userId: userId };
    const updated = Date.now();
    let updating = await db.User.findOneAndUpdate(filter, {
      firstName,
      lastName,
      headline,
      bio,
      admin,
      location,
      active,
      experience,
      updated,
    });
    res.redirect(`/jargon/profile/${userId}`);
  } catch (e) {
    console.log(e.message);
  }
};

// Exports
module.exports = {
  register,
  login,
  updateUser,
  show,
};
