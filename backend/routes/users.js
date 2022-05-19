/** @format */

const router = require("express").Router();
let User = require("../models/user.model");

//add new user
router.route("/").post((req, res) => {
  const { username } = req.body;

  const newUser = new User({ username });

  const jsonRes = { username: newUser.username, _id: newUser.id };

  newUser
    .save()
    .then(() => res.json(jsonRes))
    .catch((err) => {
      if ((err.code = 11000)) res.json(jsonRes);
      else res.status(400).json(`Error: ${err}`);
    });
});

//get all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.send([users]))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//export router
module.exports = router;
