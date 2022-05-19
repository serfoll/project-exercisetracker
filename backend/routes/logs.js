/** @format */

const router = require("express").Router();
const Exercise = require("../models/exercise.model");
const User = require("../models/user.model");

router.route("/:_id/logs").get((req, res) => {
  let { from, to, limit } = req.query;
  const userId = req.params._id;
  let result;
  let filter = !from && !to ? { userid: userId } : { userid: userId, date: {} };

  User.findById(userId)
    .then((user) => {
      console.log(filter);
      if (from) {
        $gt = new Date(from);
        filter.date["$gt"] = $gt;
      }
      if (to) {
        $lt = new Date(to);
        filter.date["$lt"] = $lt;
      }

      Exercise.find(filter)
        .limit(limit)
        .then((exercises) => {
          result = {
            username: user.username,
            _id: userId,
            count: exercises.length,
            log: exercises.map((e) => {
              return {
                description: e.description,
                duration: e.duration,
                date: e.date.toDateString(),
              };
            }),
          };
          res.send(result);
        })
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
