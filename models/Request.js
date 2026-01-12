const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  bookName: String,
  author: String,
  requestedBy: String,
  status: { type: String, default: "Requested" }
});

module.exports = mongoose.model("Request", RequestSchema);
