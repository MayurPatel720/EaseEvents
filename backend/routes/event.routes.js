const express = require("express");
const router = express.Router();
const Event = require("../models/event.model");

router.get("/all", async function (req, res) {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Error fetching events", error: err });
  }
});

router.post("/create_event", async function (req, res) {
  const {
    title,
    venue,
    date,
    startTime,
    endTime,
    image,
    ticketCategory,
    ticketPrice,
    ticketsAvailable,
    createdBy,
  } = req.body;

  // Validation: You can add custom validations here if needed
  if (
    !title ||
    !venue ||
    !date ||
    !startTime ||
    !endTime ||
    !image ||
    !ticketCategory ||
    !ticketsAvailable
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newEvent = await Event.create({
      title,
      venue,
      date,
      startTime,
      endTime,
      createdBy,
      image,
      ticketCategory,
      ticketPrice: ticketCategory === "paid" ? ticketPrice : undefined,
      ticketsAvailable,
    });

    res.status(201).json({
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

router.get("/create_event", function (req, res) {
  res.send("all events");
});

router.get("/:eventID", async function (req, res) {
  const eventId = req.params.eventID;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:eventID/participants", async function (req, res) {
  const eventId = req.params.eventID;
  try {
    const event = await Event.findById(eventId).populate("participants");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.json(event);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.post("/myevents", async (req, res) => {
  try {
    const { userid } = req.body;
    if (!userid) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const events = await Event.find({ createdBy: userid });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
