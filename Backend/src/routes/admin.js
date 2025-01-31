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
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const upcomingEvents = await Event.countDocuments({
      date: { $gte: new Date() },
    });

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("firstName lastName emailId");

    const recentEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name date");

    res.status(200).json({
      stats: {
        totalUsers,
        totalEvents,
        upcomingEvents,
        recentUsers,
        recentEvents,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});
module.exports = adminRouter;
