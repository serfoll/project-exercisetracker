/** @format */

const { Schema, default: mongoose } = require("mongoose");

const logSchema = new Schema(
  {
    userid: {
      type: Number,
      required: true,
    },
    count: { type: Number },
    log: { type: [{}] },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
