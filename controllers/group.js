const db = require("../models");

const index = (req, res) => {
  // Purpose: Fetch all groups from DB and return
  console.log("=====> Inside GET /index");

  db.Group.find({}, (err, foundGroups) => {
    if (err) console.log("Error in group#index:", err);
    res.json(foundGroups);
  });
};

const show = (req, res) => {
  // Purpose: Fetch one group from DB and return
  console.log("=====> Inside GET /group/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding group by id

  db.Group.findById(req.params.id, (err, foundGroup) => {
    if (err) console.log("Error in group#show:", err);
    res.json(foundGroup);
  });
};

const create = (req, res) => {
  // Purpose: Create one group by adding body to DB, and return
  console.log("=====> Inside create /group");
  console.log("=====> req.body");
  console.log(req.body); // object used for creating new company

  const newGroup = {
    userId: req.user.id,
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    members: [req.user.id],
  };

  db.Group.create(newGroup, async (err, savedGroup) => {
    res.json(savedGroup);
  });
};

const update = (req, res) => {
  // Purpose: Update one group in the DB, and return
  console.log("=====> Inside PUT /group/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding group by id
  console.log("=====> req.body");
  console.log(req.body); // object used for updating group

  db.Group.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedGroup) => {
      if (err) console.log("Error in group#update:", err);
      res.json(updatedGroup);
    }
  );
};

const destroy = (req, res) => {
  // Purpose: Update one group in the DB, and return
  console.log("=====> Inside DELETE /group/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding group by id

  db.Group.findByIdAndDelete(req.params.id, (err, deletedGroup) => {
    if (err) console.log("Error in group#destroy:", err);
    res.sendStatus(200);
    console.log(deletedGroup);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
