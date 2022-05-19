/** @format */
const router = require("express").Router();
let Exercise = require("../models/exercise.model");
let User = require("../models/user.model");

//add new exercise
router.route("/:id/exercises").post((req, res) => {
  let id = req.params.id;
  let {description, duration, date } = req.body;
  //handle empty date
  if (!date) {
    date = new Date(Date.now());
  }
  //find user and add exercise
  User.findByIdAndUpdate(id)
    .then((user) => {
      const exercise = new Exercise({
        userid: id,
        description: description,
        duration: duration,
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

//export router
module.exports = router;
