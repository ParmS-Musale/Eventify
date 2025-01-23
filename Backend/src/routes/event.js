const Razorpay = require("razorpay");
const express = require("express");
const userAuth = require("../middlewares/auth"); // Corrected import
const Event = require("../models/event");
const User = require("../models/user");
const { validateEventData } = require("../utils/validation");
const isAdmin = require("../middlewares/isAdmin");
const event = require("../models/event");
const Payment = require("../models/payment");
const { verifyPayment } = require("../controllers/payment");
const eventRouter = express.Router();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Use environment variables for security
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Event Route
eventRouter.post("/events/create", userAuth,  async (req, res) => {
  try {
    // Validate request data
    const validationResult = validateEventData(req.body); // Example validation function
    if (validationResult !== true) {
      return res.status(400).json({ message: validationResult });
    }

    const { name, description, date, location, capacity } = req.body;

    // Check if an event with the same name already exists
    const existingEvent = await Event.findOne({ name });
    if (existingEvent) {
      return res
        .status(400)
        .json({ message: "Event with this name already exists" });
    }

    // Create and save the event
    const event = new Event({
      name,
      description,
      date,
      location,
      capacity,
      createdBy: req.user._id,
    });

    const savedEvent = await event.save();

    res.status(201).json({
      message: "Event created successfully..!!",
      data: savedEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

// View Available Events
eventRouter.get("/events", async (req, res) => {
  try {
    const { search, category } = req.query;

    // Create a query object based on filters
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }
    if (category && category !== "All") {
      query.category = category;
    }

    const events = await Event.find(query); // Fetch filtered events
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// View Event Details
eventRouter.get("/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// Register for an Event
eventRouter.post("/events/register/:eventId", userAuth, async (req, res) => {
  try {
    const userId = req.user._id; // From `userAuth` middleware
    const eventId = req.params.eventId;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if user is already registered
    if (event.registeredUsers.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You are already registered for this event" });
    }

    // Check if event capacity is full
    if (event.registeredUsers.length >= event.capacity) {
      return res.status(400).json({ error: "Event is fully booked" });
    }

    // Add user to the event's registeredUsers
    event.registeredUsers.push(userId);
    await event.save();

    // Add event to user's registeredEvents
    const user = await User.findById(userId);
    user.registeredEvents.push(eventId);
    await user.save();

    res.json({ message: "Successfully registered for the event", event });
  } catch (error) {
    res.status(500).json({ error: "Failed to register for event" });
  }
});

// View Events Created by the User
eventRouter.get("/events/my-events", userAuth, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id });
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

// Edit an Event
eventRouter.post("/events/:id", userAuth, isAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("createdBy");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const {
      name,
      description,
      date,
      location,
      capacity,
      photoUrl,
      category,
      price,
    } = req.body;
    if (name) event.name = name;
    if (description) event.description = description;
    if (date) event.date = date;
    if (location) event.location = location;
    if (capacity) event.capacity = capacity;
    if (photoUrl) event.photoUrl = photoUrl;
    if (category) event.category = category;
    if (price) event.price = price;
    event.createdBy = req.user._id;

    const updatedEvent = await event.save();
    res.status(200).json({
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

// Delete an Event
eventRouter.delete("/events/:id", userAuth,isAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Allow only the creator to delete the event
    // if (
    //   !event.registeredUsers ||
    //   event.registeredUsers.toString() !== req.user._id.toString()
    // ) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorized to edit this event" });
    // }

    await Event.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Event deleted successfully" });
    await event.save();
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

// Route to create an order for an event
eventRouter.post("/create-payment", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount) {
      return res
        .status(400)
        .json({ success: false, message: "Amount is required." });
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Convert amount to the smallest unit (paise for INR)
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

      
    res.json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// eventRouter.post("/verify", userAuth,verifyPayment);
 





module.exports = eventRouter;
