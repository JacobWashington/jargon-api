const db = require("../models");

const index = (req, res) => {
  // Purpose: Fetch all companyProfile from DB and return
  console.log("=====> Inside GET /index");

  db.CompanyProfile.find({}, (err, foundProfiles) => {
    if (err) console.log("Error in companyProfile#index:", err);
    res.json(foundProfiles);
  });
};

const show = (req, res) => {
  // Purpose: Fetch one comment from DB and return
  console.log("=====> Inside GET /companyProfile/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding comment by id

  db.Company.findById(req.params.id, (err, foundCompany) => {
    if (err) console.log("Error in company#show:", err);
    res.json(foundCompany);
  });
};

const create = (companyObj) => {
  console.log('LOC STORAGE',localStorage)

  const newProfile = {
    companyId: companyObj._id,
    admin: localStorage.userId,
  };

  db.CompanyProfile.create(
    newProfile,
    async(err, (savedProfile) => {
      res.json(savedProfile);
    })
  );
};

const update = (req, res) => {
  // Purpose: Update one profile in the DB, and return
  console.log("=====> Inside PUT /companyProfile/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding profile by id
  console.log("=====> req.body");
  console.log(req.body); // object used for updating profile

  db.CompanyProfile.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedProfile) => {
      if (err) console.log("Error in companyProfile#update:", err);
      res.json(updatedProfile);
    }
  );
};

const destroy = (req, res) => {
  // Purpose: Update one profile in the DB, and return
  console.log("=====> Inside DELETE /companyProfile/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding profile by id

  db.CompanyProfile.findByIdAndDelete(req.params.id, (err, deletedProfile) => {
    if (err) console.log("Error in companyProfile#destroy:", err);
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
