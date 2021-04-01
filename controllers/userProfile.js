const db = require("../models");

const index = (req, res) => {
  // Purpose: Fetch all Profile from DB and return
  console.log("=====> Inside GET userProfile/index");

  db.UserProfile.find({}, (err, foundProfiles) => {
    if (err) console.log("Error in userProfile#index:", err);
    res.json(foundProfiles);
  });
};

const show = (req, res) => {
  // Purpose: Fetch one profile from DB and return
  console.log("=====> Inside GET /userProfile/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding profile by id

  db.UserProfile.findById(req.params.id, (err, foundProfile) => {
    if (err) console.log("Error in userProfile#show:", err);
    res.json(foundProfile);
  });
};

const create = (req, res) => {
  // Purpose: Create one Profile by adding body to DB, and return
  console.log("=====> Inside create userProfile/Profile");
  console.log("=====> req.body");
  console.log(req.body); // object used for creating new Profile

  const newProfile = {
    userId: req.user.id,
  };

  db.UserProfile.create(
    newProfile,
    async(err, (savedProfile) => {
      res.json(savedProfile);
    })
  );
};

const update = (req, res) => {
  // Purpose: Update one profile in the DB, and return
  console.log("=====> Inside PUT /userProfile/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding profile by id
  console.log("=====> req.body");
  console.log(req.body); // object used for updating profile

  db.UserProfile.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedProfile) => {
      if (err) console.log("Error in userProfile#update:", err);
      res.json(updatedProfile);
    }
  );
};

const destroy = (req, res) => {
  // Purpose: Update one profile in the DB, and return
  console.log("=====> Inside DELETE /userProfile/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding profile by id

  db.UserProfile.findByIdAndDelete(req.params.id, (err, deletedProfile) => {
    if (err) console.log("Error in userProfile#destroy:", err);
    res.sendStatus(200);
    console.log(deletedProfile);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
