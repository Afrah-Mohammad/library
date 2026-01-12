const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  bookTitle: String,
  studentName: String,
  issueDate: { type: Date, default: Date.now },
  returnDate: Date
});

module.exports = mongoose.model("Issue", IssueSchema);
