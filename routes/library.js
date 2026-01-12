const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Issue = require("../models/Issue");

/* 1️⃣ Add Book */
router.post("/books", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

/* 2️⃣ View All Books */
router.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

/* 3️⃣ Issue Book */
router.post("/issue", async (req, res) => {
  const { bookId, studentName } = req.body;

  await Book.findByIdAndUpdate(bookId, { available: false });

  const issue = new Issue({
    bookTitle: req.body.bookTitle,
    studentName
  });
  await issue.save();

  res.json({ message: "Book issued" });
});

/* 4️⃣ Return Book */
router.put("/return/:bookId", async (req, res) => {
  await Book.findByIdAndUpdate(req.params.bookId, {
    available: true
  });
  res.json({ message: "Book returned" });
});

/* 5️⃣ Issued History */
router.get("/history", async (req, res) => {
  const history = await Issue.find();
  res.json(history);
});

module.exports = router;
