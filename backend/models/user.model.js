/** @format */

const { Schema, default: mongoose, mongo } = require("mongoose");

// const exerciseSchema = new Schema({
//   description: { type: String },
//   duration: { type: Number },
//   date: { type: Date },
// });

//Create userScema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true }
);

//definer user
const User = mongoose.model("User", userSchema);

module.exports = User;
