const express = require("express");
const userAuth = require("../middlewares/auth");
const { vaildateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();

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

module.exports = profileRouter;
