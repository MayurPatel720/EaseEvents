const mongoose = require("mongoose");
const qr = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const sendTicketEmail = require("../config/emailService");

const ParticipantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  ticketNumber: { type: String, unique: true, required: true },
  razorpayPaymentId: { type: String },
  razorpayOrderId: { type: String },
  qrCode: {
    type: String,
  },
});

// Generate QR Code and Ticket on Successful Payment
ParticipantSchema.pre("save", async function (next) {
  if (this.isModified("paymentStatus") && this.paymentStatus === "paid") {
    if (!this.ticketNumber) {
      this.ticketNumber = `TICKET-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`;
    }
    if (!this.qrCode) {
      this.qrCode = await qr.toDataURL(this.ticketNumber);
    }

    // Send Email with Ticket & QR Code
    await sendTicketEmail(this.email, this.ticketNumber, this.qrCode);
  }
  next();
});

module.exports = mongoose.model("Participant", ParticipantSchema);
