const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  bookName: String,
  author: String,
  requestedBy: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Request", requestSchema);
