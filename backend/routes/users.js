/** @format */

const router = require("express").Router();
let User = require("../models/user.model");

//add new user
router.route("/").post((req, res) => {
  const { username } = req.body;
  const newUser = new User({ username: username, exercises: [] });
  const jsonRes = {
    username: newUser.username,
    _id: newUser.id,
  };

  newUser
    .save()
    .then(() => res.json(jsonRes))
    .catch((err) => {
      if (err.code === 11000) res.json(jsonRes);
      else res.status(400).json(`Error: ${err}`);
    });
});

//add new exercise
router.route("/:id/exercises").post((req, res) => {
  let { ":_id": id, description: desc, duration: durr, date: date } = req.body;

  if (!date) {
    const currDate = Date.now();
    date = new Date(currDate).toDateString();
  }

  User.findByIdAndUpdate(id)
    .then((user) => {
      user.exercises.push({
        description: desc,
        duration: +durr,
        date: new Date(date).toDateString(),
      });

      user
        .save()
        .then(() => {
          res.json({
            _id: user._id,
            username: user.username,
            date: new Date(date).toDateString(),
            duration: +durr,
            description: desc,
          });
        })
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//get all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//export router
module.exports = router;
