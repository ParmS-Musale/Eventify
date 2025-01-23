const express = require("express");
const { validateSignupData } = require("../utils/validation");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Signup Validation
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req); // Validate the signup data from Request Body

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt The Password
    const hashPassword = await bcrypt.hash(password, 10); // Password Encryption Using Bcrypt

    // Create a new User instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      password,
    });

    // Save the User to the Database
    const savedUser = await user.save();

    // Generate JWT Token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); // using jwt.sign

    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400000), // Set expiration time for cookie
    });
    res.json({ message: "User Created Successfully", data: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Validation
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password); // `password` is the plaintext password from the request

    if (isPasswordValid) {
      // Generate JWT Token

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours cookie expiration
      });

      res.send({ message: "Logged in successfully", user });
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);

    res.status(500).json({ message: error.message });
  }
});

// Logout API
authRouter.post("/logout", async (req, res) => {
  try {
    // Clear the JWT token in the cookie
    res
      .cookie("token", "", { expires: new Date(0) }) // Empty token to clear it
      .json({ message: "Logged out successfully",success:true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = authRouter;
