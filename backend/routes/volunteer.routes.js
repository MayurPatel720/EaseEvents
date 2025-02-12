const Volunteer = require("../models/volunteer.model");

const volunteerProfile = new Volunteer({
  user: userId,
  skills: ["event management", "technical support"],
  preferredRoles: ["technical", "coordinator"],
});

volunteerProfile.events.push({
  event: eventId,
  role: "technical",
  status: "pending",
});
