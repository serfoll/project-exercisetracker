/** @format */

//define router
const router = require("express").Router();
let Exercise = require("../models/exercise.model");

router.route("/").post((req, res) => {
  let { ":_id": id, description: desc, duration: durr, date: date } = req.body;
});

//get all exercises
module.exports = router;
