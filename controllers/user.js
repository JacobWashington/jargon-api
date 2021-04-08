// Imports
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const db = require("../models");
const { create } = require("../models/comment");

const register = async (req, res) => {
  const foundUser = await db.User.findOne({ email: req.body.email });
  if (foundUser) {
    res.json("A user with this email already exists.");
  } else
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })
      .then((createdUser) => {
        // Salt and hash the password - before saving the user
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw Error;

          bcrypt.hash(createdUser.password, salt, (err, hash) => {
            if (err) console.log(">>>>> Error inside of hash", err);
            // Change the password in newUser to the hash
            createdUser.password = hash;
            createdUser
              .save() // save the user to the database
              .then((createdUser) => res.json(createdUser))
              .catch((err) => console.log(err));
          });
        });

        db.UserProfile.create({userId: createdUser.id}).then(profile => {
          res.json(profile)
        })
        .catch(err=> {
          console.log(err)
        })
      })
      .catch((err) => {
        console.log(err);
      });
};

const show = (req, res) => {
  const userId = req.params.id || req.body.id;
  db.User.findById(userId, (err, foundUser) => {
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
  console.log("UPDATE ROUTE");
  console.log(req.body)
  const filter = { _id: req.body._id };
  const update = {
    ...req.body,
    updated: Date.now()
  };

  db.User.findOneAndUpdate(
    filter,
    update,
    // { new: true },
    (err, doc) => {
      console.log("INSIDE OF IF STATEMENT")
      console.log('UPDATE', update)
      if (err) {
        console.log("ERROR IN UPDATE USER", err);
      }
      console.log("ELSE STATEMENT",doc);
      res.json(doc)
    }
  );
};

// Exports
module.exports = {
  register,
  login,
  updateUser,
  show,
};
