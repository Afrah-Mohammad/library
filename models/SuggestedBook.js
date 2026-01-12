const mongoose = require("mongoose");

const SuggestedSchema = new mongoose.Schema({
  title: String,
  author: String
});

module.exports = mongoose.model("SuggestedBook", SuggestedSchema);
