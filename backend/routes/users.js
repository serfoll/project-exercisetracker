/** @format */

const router = require("express").Router();
let User = require("../models/user.model");
let Exercise = require("../models/exercise.model");

//add new user
router.route("/").post((req, res) => {
  const { username } = req.body;
  const newUser = new User({ username: username });
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
  //handle empty date
  if (!date) {
    date = new Date(Date.now());
  }
  //find user and add exercise
  User.findByIdAndUpdate(id)
    .then((user) => {
      const exercise = new Exercise({
        userid: id,
        description: desc,
        duration: durr,
        date: date,
      });

      exercise
        .save()
        .then(() => {
          res.json({
            _id: user._id,
            username: user.username,
            date: exercise.date.toDateString(),
            duration: +exercise.duration,
            description: exercise.description,
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
