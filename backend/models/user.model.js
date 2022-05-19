/** @format */

const { Schema, default: mongoose, mongo } = require("mongoose");

//Create userScema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    exercises: [{}],
  },
  { timestamps: true }
);

//definer user
const User = mongoose.model("User", userSchema);

module.exports = User;
