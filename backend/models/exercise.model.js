/** @format */

const { Schema, default: mongoose } = require("mongoose");

const exerciseSchema = new Schema(
  {
    userid: {
      type: Number,
      required: true,
    },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
