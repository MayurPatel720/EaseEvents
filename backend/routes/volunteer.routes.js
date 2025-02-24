const express = require("express");
const Volunteer = require("../models/volunteer.model");
const Event = require("../models/event.model");
const SendPassword = require("../config/SendPassword");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    const { name, email, phone, eventId, role } = req.body;

    if (!name || !email || !phone || !eventId || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      return res.status(404).json({ message: "Event not found" });
    }

    let volunteerProfile = await Volunteer.findOne({ email });

    if (!volunteerProfile) {
      const defaultPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      volunteerProfile = new Volunteer({
        name,
        email,
        phone,
        password: hashedPassword,
        events: [
          {
            event: eventId,
            role,
            date: eventExists.date,
            eventname: eventExists.title,
            status: "pending",
            assignedTasks: "",
          },
        ],
      });
      await SendPassword(name, email, defaultPassword, eventExists.title);
    } else {
      const isAlreadyRegistered = volunteerProfile.events.some(
        (ev) => ev.event.toString() === eventId
      );

      if (isAlreadyRegistered) {
        return res.status(400).json({
          message: "You are already registered as a volunteer for this event",
        });
      }

      // Make sure we're explicitly setting all fields
      volunteerProfile.events.push({
        event: eventId,
        role,
        eventname: eventExists.title,
        date: eventExists.date,
        status: "pending",
        assignedTasks: "", // Explicitly set as empty string
      });
    }

    // Log right before saving to confirm the structure
    console.log(
      "Volunteer profile before save:",
      JSON.stringify(volunteerProfile, null, 2)
    );

    await volunteerProfile.save();

    eventExists.volunteers.push(volunteerProfile._id);
    await eventExists.save();

    res.status(201).json({
      message: "Volunteer registration successful",
      volunteer: volunteerProfile,
      note: "You will receive your login credentials soon.",
    });
  } catch (error) {
    console.error("Error in volunteer registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;

    const volunteers = await Volunteer.find({
      "events.event": eventId,
    }).select("name email phone events");

    res.status(200).json({ volunteers });
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:VolID/details", async (req, res) => {
  try {
    const VolID = req.params.VolID;

    const response = await Volunteer.findById(VolID);
    if (!response) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching volunteer:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.post("/edittask", async (req, res) => {
  try {
    const { volunteerId, eventId, name, email, phone, role, assignedTasks } =
      req.body;

    // Find the volunteer first
    const volunteer = await Volunteer.findById(volunteerId);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    // Update basic info at the volunteer level
    if (name) volunteer.name = name;
    if (email) volunteer.email = email;
    if (phone) volunteer.phone = phone;

    // Find the specific event in the events array
    const eventIndex = volunteer.events.findIndex(
      (event) => event.event.toString() === eventId
    );

    if (eventIndex === -1) {
      return res
        .status(404)
        .json({ message: "Event not found for this volunteer" });
    }

    // Update role if provided
    if (role) volunteer.events[eventIndex].role = role;

    // Update assignedTasks - now a simple string
    if (assignedTasks !== undefined) {
      // Convert any value to string to ensure compatibility
      volunteer.events[eventIndex].assignedTasks = String(assignedTasks);
    }

    // Save the updated volunteer
    const updatedVolunteer = await volunteer.save();

    res.status(200).json({
      message: "Volunteer task updated successfully",
      updatedVolunteer,
    });
  } catch (error) {
    console.error("Error updating volunteer task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete/:volunteerId/:eventId", async (req, res) => {
  try {
    const { volunteerId, eventId } = req.params;

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    // Remove the event from the volunteer's events array
    volunteer.events = volunteer.events.filter(
      (ev) => ev.event.toString() !== eventId
    );

    // If the volunteer is not associated with any other event, delete them
    if (volunteer.events.length === 0) {
      await Volunteer.findByIdAndDelete(volunteerId);
    } else {
      await volunteer.save();
    }

    // Remove volunteer from the event's volunteers list
    const event = await Event.findById(eventId);
    if (event) {
      event.volunteers = event.volunteers.filter(
        (vId) => vId.toString() !== volunteerId
      );
      await event.save();
    }

    res.status(200).json({ message: "Volunteer successfully removed" });
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
