const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Authenticate User
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log("Token:", token); // Debugging line

    if (!token) {
      return res.status(401).send("Please Login..!!");
    }

    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decodedObj); // Debugging line

    const { _id } = decodedObj;
    const user = await User.findById(decodedObj._id);
    console.log("Found User:", user); // Debugging line

    if (!user) {
      throw new Error("User not found..!!");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = userAuth;
