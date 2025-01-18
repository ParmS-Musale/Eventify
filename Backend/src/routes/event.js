const express = require("express");
const userAuth = require("../middlewares/auth");
const Event = require("../models/event");
const User = require("../models/user");
const { validateEventData } = require("../utils/validation");
const eventRouter = express.Router();

// Create Event Route
eventRouter.post("/events/create", userAuth, async (req, res) => {
  try {
    // You can add further validation for the request body if needed.
    const validationResult = validateEventData(req); // Assume you validate the event data (e.g., name, date, etc.)
    if (validationResult !== true) {
      return res.status(400).send(validationResult); // Return validation error message if invalid
    }

    const { name, description, date, location, capacity } = req.body;

    // Check if an event with the same name already exists
    const existingEvent = await Event.findOne({ name });
    if (existingEvent) {
      return res
        .status(400)
        .json({ message: "Event with this name already exists" });
    }

    // Create a new event
    const event = new Event({
      name,
      description,
      date,
      location,
      capacity,
      createdBy: req.user._id,
    });

    // Save event to database
    const savedEvent = await event.save();

    res.status(201).json({
      message: "Event created successfully",
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
    const events = await Event.find(); // Fetch all events
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
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
eventRouter.patch("/events/:id", userAuth, async (req, res) => {
  try {
    console.log("inside pathhch route");
    console.log(req.user);
    console.log(req.params);

    const event = await Event.findById(req.params.id).populate("createdBy");
    console.log("Event Created By:", event);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    //   console.log("Fetched Event:", event);

    if (
      !event.registeredUsers ||
      event.registeredUsers.toString() !== req.user._id.toString()
    ) {
      console.log("Event Created By:", event.registeredUsers);
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this event" });
    }

    const { name, description, date, location, capacity, photoUrl } = req.body;
    if (name) event.name = name;
    if (description) event.description = description;
    if (date) event.date = date;
    if (location) event.location = location;
    if (capacity) event.capacity = capacity;
    if (photoUrl) event.photoUrl = photoUrl;
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
eventRouter.delete("/events/:id", userAuth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Allow only the creator to delete the event
    if (
      !event.registeredUsers ||
      event.registeredUsers.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this event" });
    }

    await Event.findByIdAndDelete({ _id: req.params.id });
    await event.save();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

module.exports = eventRouter;
