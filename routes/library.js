const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

/* =====================
   USER ROUTES
===================== */

// Create request
router.post("/request", async (req, res) => {
  const { bookName, author, requestedBy } = req.body;
  const request = await Request.create({ bookName, author, requestedBy });
  res.json(request);
});

// Get all requests (user view)
router.get("/requests", async (req, res) => {
  const requests = await Request.find().sort({ createdAt: -1 });
  res.json(requests);
});

// Delete request
router.delete("/request/:id", async (req, res) => {
  await Request.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Suggested books
router.get("/suggested", (req, res) => {
  res.json([
    { title: "Cloud Computing", author: "Rajkumar Buyya" },
    { title: "Distributed Systems", author: "Andrew S. Tanenbaum" },
    { title: "Operating System Concepts", author: "Silberschatz" },
    { title: "Computer Networks", author: "Andrew S. Tanenbaum" }
  ]);
});

// Feedback
router.post("/feedback", (req, res) => {
  res.json({ message: "Thanks for your feedback!" });
});

/* =====================
   ADMIN ROUTES
===================== */

// Admin dashboard data
router.get("/admin/stats", async (req, res) => {
  const totalRequests = await Request.countDocuments();
  const uniqueUsers = await Request.distinct("requestedBy");

  const allRequests = await Request.find().sort({ createdAt: -1 });

  res.json({
    totalRequests,
    totalUsers: uniqueUsers.length,
    users: uniqueUsers,
    requests: allRequests
  });
});

module.exports = router;
