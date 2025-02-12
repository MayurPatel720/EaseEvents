const mongoose = require("mongoose");
const { Schema } = mongoose;

const VolunteerSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    events: [
      {
        event: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
          required: true,
        },
        role: {
          type: String,
          required: true,
          enum: [
            "registration",
            "setup",
            "coordinator",
            "usher",
            "technical",
            "security",
            "general",
          ],
        },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected", "completed"],
          default: "pending",
        },
        assignedTasks: [
          {
            description: { type: String, required: true },
            startTime: { type: String, required: true },
            endTime: { type: String, required: true },
            status: {
              type: String,
              enum: ["pending", "in-progress", "completed"],
              default: "pending",
            },
            completedAt: Date,
          },
        ],
        checkInTime: Date,
        checkOutTime: Date,
        totalHours: {
          type: Number,
          default: 0,
        },
        feedback: {
          rating: {
            type: Number,
            min: 1,
            max: 5,
          },
          comment: String,
          submittedAt: Date,
        },
      },
    ],
    skills: [
      {
        type: String,
      },
    ],
    availability: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        startTime: String,
        endTime: String,
      },
    ],
    totalEventsParticipated: {
      type: Number,
      default: 0,
    },
    totalVolunteerHours: {
      type: Number,
      default: 0,
    },
    preferredRoles: [
      {
        type: String,
        enum: [
          "registration",
          "setup",
          "coordinator",
          "usher",
          "technical",
          "security",
          "general",
        ],
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    documents: [
      {
        type: {
          type: String,
          enum: ["id", "certificate", "other"],
        },
        url: String,
        verificationStatus: {
          type: String,
          enum: ["pending", "verified", "rejected"],
          default: "pending",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Middleware to update total counts when a new event is added
VolunteerSchema.pre("save", function (next) {
  if (this.isModified("events")) {
    this.totalEventsParticipated = this.events.length;
    this.totalVolunteerHours = this.events.reduce((total, event) => {
      return total + (event.totalHours || 0);
    }, 0);
  }
  next();
});

// Method to calculate volunteer hours for an event
VolunteerSchema.methods.calculateEventHours = function (eventId) {
  const event = this.events.find(
    (e) => e.event.toString() === eventId.toString()
  );
  if (event && event.checkInTime && event.checkOutTime) {
    const hours =
      (new Date(event.checkOutTime) - new Date(event.checkInTime)) /
      (1000 * 60 * 60);
    event.totalHours = Math.round(hours * 10) / 10; // Round to 1 decimal place
    return event.totalHours;
  }
  return 0;
};

// Method to get active events
VolunteerSchema.methods.getActiveEvents = function () {
  return this.events.filter(
    (event) => event.status === "approved" && !event.checkOutTime
  );
};

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);
module.exports = Volunteer;
