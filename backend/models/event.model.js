const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Event schema
const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    image: { type: String, required: true },
    ticketCategory: {
      type: String,
      enum: ["free", "paid"],
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: function () {
        return this.ticketCategory === "paid";
      },
    },
    ticketsAvailable: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create and export the model
const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
