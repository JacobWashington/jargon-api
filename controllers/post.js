const db = require("../models");

const show = (req, res) => {
  // Purpose: Fetch one post from DB and return
  console.log("=====> Inside GET /post/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding post by id

  db.Post.findById(req.params.id, (err, foundPost) => {
    if (err) console.log("Error in post#show:", err);
    res.json(foundPost);
  });
};

const showByUserId = (req, res) => {
  db.Post.findOne(req.params.userId, (err, foundPosts) => {
    if (err) console.log("Error in post#show:", err);
    res.json(foundPosts);
  });
};

const create = (req, res) => {
  const payload = {
    _id: req.body._id,
    content: req.body.content
  }
  db.Post.create(payload, async (err, savedPost) => {
    console.log()
    console.log(res.req.user);
  });
};

const update = (req, res) => {
  // Purpose: Update one post in the DB, and return
  console.log("=====> Inside PUT /post/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding post by id
  console.log("=====> req.body");
  console.log(req.body); // object used for updating post

  db.Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPost) => {
      if (err) console.log("Error in post#update:", err);
      res.json(updatedPost);
    }
  );
};

const destroy = (req, res) => {
  // Purpose: Update one post in the DB, and return
  console.log("=====> Inside DELETE /post/:id");
  console.log("=====> req.params");
  console.log(req.params); // object used for finding post by id

  db.Post.findByIdAndDelete(req.params.id, (err, deletedPost) => {
    if (err) console.log("Error in post#destroy:", err);
    res.sendStatus(200);
    console.log(deletedPost);
  });
};

module.exports = {
  show,
  showByUserId,
  create,
  update,
  destroy,
};
