"mongodb+srv://ParmDev:ParmDev21@dev.c30en.mongodb.net/Eventify";

const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;