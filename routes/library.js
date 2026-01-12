const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const SuggestedBook = require("../models/SuggestedBook");
const Feedback = require("../models/Feedback");

/* 1️⃣ Request Book */
router.post("/request", async (req, res) => {
  await new Request(req.body).save();
  res.json({ message: "Book requested successfully" });
});

/* 2️⃣ View Requests (extra functionality) */
router.get("/requests", async (req, res) => {
  res.json(await Request.find());
});

/* 3️⃣ Update Requested Book */
router.put("/request/:id", async (req, res) => {
  await Request.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Request updated successfully" });
});

/* 4️⃣ Delete Requested Book */
router.delete("/request/:id", async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);
  res.json({ message: "Request deleted successfully" });
});

/* 5️⃣ Suggested Books */
router.get("/suggested", async (req, res) => {
  const books = [
    { title: "Cloud Computing", author: "Rajkumar Buyya" },
    { title: "Distributed Systems", author: "Andrew S. Tanenbaum" },
    { title: "Operating System Concepts", author: "Silberschatz" },
    { title: "Computer Networks", author: "Andrew S. Tanenbaum" },
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann" },
    { title: "Clean Code", author: "Robert C. Martin" },
    { title: "Clean Architecture", author: "Robert C. Martin" },
    { title: "Introduction to Algorithms", author: "Cormen et al." },
    { title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell" },
    { title: "Machine Learning", author: "Tom M. Mitchell" },
    { title: "Deep Learning", author: "Ian Goodfellow" },
    { title: "You Don’t Know JS", author: "Kyle Simpson" }
  ];

  for (const book of books) {
    await SuggestedBook.updateOne(
      { title: book.title },
      { $setOnInsert: book },
      { upsert: true }
    );
  }

  res.json(await SuggestedBook.find());
});




/* Request from Suggested */
router.post("/request/suggested", async (req, res) => {
  await new Request(req.body).save();
  res.json({ message: "Requested from suggested books" });
});

/* 6️⃣ Feedback */
router.post("/feedback", async (req, res) => {
  await new Feedback(req.body).save();
  res.json({ message: "Thank you for your feedback!" });
});

module.exports = router;
