const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Assuming User model includes role field
const adminRouter = express.Router();
const userAuth = require("../middlewares/auth");
const isAdmin = require("../middlewares/auth");
const Event = require("../models/event");

// Admin Dashboard API
adminRouter.get("/admin/dashboard", userAuth, isAdmin, async (req, res) => {
  try {
    // Fetch total counts
    const totalUsers = await User.countDocuments();
    console.log("Total Users:", totalUsers);
    const totalEvents = await Event.countDocuments();
    console.log("Total Events:", totalEvents);

    // Additional statistics can be added here, e.g., active users or upcoming events
    const upcomingEvents = await Event.countDocuments({
      date: { $gte: new Date() },
    });

    res.status(200).json({
      message: "Admin dashboard status fetched successfully",
      stats: {
        totalUsers,
        totalEvents,
        upcomingEvents,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

module.exports = adminRouter;
