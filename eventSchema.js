const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  // {
  //   name: { type: String },
  //   email: { type: String },
  //   password: { type: String },
  // },
  // {
  //   collection: "Students",
  // }
);
module.exports = mongoose.model("Events", eventSchema);
