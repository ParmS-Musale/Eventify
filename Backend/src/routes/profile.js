const express = require("express");
const userAuth = require("../middlewares/auth.js");
const isAdmin = require("../middlewares/isAdmin.js");
const { vaildateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();
const User = require("../models/user");

// Profile view route
profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// Profile Edit Route
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const validationResult = vaildateEditProfileData(req);
    if (!validationResult) {
      return res.status(400).send("Invalid Fields");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((field) => {
      if (loggedInUser[field] !== undefined)
        loggedInUser[field] = req.body[field];
    });

    await loggedInUser.save();
    res.send(
      ` ${loggedInUser.firstName} Your Profile is Updated Successfully..!!`
    );
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// Delete Profile Route

profileRouter.delete("/profile/delete", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    console.log(loggedInUser);

    // Delete the user from the database
    await User.findByIdAndDelete(loggedInUser._id);

    res.clearCookie("token"); // Clear the authentication cookie
    res.send(`${loggedInUser.firstName}, your profile has been deleted.`);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = profileRouter;
