/** @format */

const router = require("express").Router();
let User = require("../models/user.model");

//get all users
// router.route("/").get((req, res) => {
//   User.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json(`Eroor ${err}`));
// });

//add new user
router.route("/").post((req, res) => {
  const { username } = req.body;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json({ username: newUser.username, id: newUser.id }))
    .catch((err) => {
      if ((err.code = 11000))
        res.json({ username: newUser.username, id: newUser.id });
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
