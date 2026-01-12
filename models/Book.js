const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Book", BookSchema);
