const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  photoUrl: {
    type: String,
    default: "https://example.com/default-image.png", // Replace with an actual default image URL
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  price:{
    type: Number,
    required: true,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  registeredUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  category: {
    type: String,
    required: true,
    enum: ["Tech", "Development", "UI/UX", "AI", "NextJS", "General"],
    default: "General",
  }
});

module.exports = mongoose.model("Event", eventSchema);
