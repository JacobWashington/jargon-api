const db = require("../models");

const CompanyProfile = require('./companyProfile');

const index = (req, res) => {
  // Purpose: Fetch all Company from DB and return
  console.log("=====> Inside GET /index");

  db.Company.find({}, (err, foundCompanies) => {
    if (err) console.log("Error in company#index:", err);
    res.json(foundCompanies);
  });
};

const show = (req, res) => {
  // Purpose: Fetch one company from DB and return
  console.log("=====> Inside GET /company/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding company by id

  db.Company.findById(req.params.id, (err, foundCompany) => {
    if (err) console.log("Error in company#show:", err);
    res.json(foundCompany);
  });
};

const create = (req, res) => {
  // Purpose: Create one company by adding body to DB, and return
  console.log("=====> Inside create /company");
  console.log("=====> req.body");
  console.log(req.body); // object used for creating new company

  const newCompany = {
    name: req.body.name,
    category: req.body.category,
    about: req.body.about,
    location: req.body.location,
    owner: 1111111
  };

  db.Company.create(newCompany, async (err, savedCompany) => {
    res.json(savedCompany);
    CompanyProfile.create(savedCompany)
  })
};

const update = (req, res) => {
  // Purpose: Update one company in the DB, and return
  console.log("=====> Inside PUT /company/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding company by id
  console.log("=====> req.body");
  console.log(req.body); // object used for updating company

  db.Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedCompany) => {
      if (err) console.log("Error in company#update:", err);
      res.json(updatedCompany);
    }
  );
};

const destroy = (req, res) => {
  // Purpose: Update one compnay in the DB, and return
  console.log("=====> Inside DELETE /company/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding company by id

  db.Company.findByIdAndDelete(req.params.id, (err, deletedCompany) => {
    if (err) console.log("Error in company#destroy:", err);
    res.sendStatus(200);
    console.log(deletedCompany);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
