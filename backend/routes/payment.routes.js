const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Event = require("../models/event.model");

const Participant = require("../models/participant.model");
require("dotenv").config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Helper function to generate signature for payment verification
const generateSignature = (orderId, paymentId) => {
  const body = orderId + "|" + paymentId;
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET); // Use secret from env variables
  hmac.update(body);
  return hmac.digest("hex");
};

router.post("/create-order", async (req, res) => {
  try {
    const { name, email, phone, eventId, amount } = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.ticketsAvailable <= 0) {
      return res.status(400).json({ message: "No tickets available" });
    }
    if (!eventId) {
      return res.status(400).json({ error: "eventId is required" });
    }

    const ticketNumber = `TICKET-${Date.now()}-${Math.floor(
      Math.random() * 10000
    )}`;

    // Create order in Razorpay
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);

    const participant = await Participant.create({
      name,
      email,
      phone,
      eventId,
      ticketNumber,
      razorpayOrderId: order.id,
      paymentStatus: "pending", // Mark as pending until verified
    });

    event.participants.push(participant._id);
    await event.save(); // Don't reduce tickets here

    res.json(order);
    console.log("New Participant:", participant);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/verify-payment", async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing required payment data" });
  }

  try {
    const participant = await Participant.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }

    const event = await Event.findById(participant.eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const generated_signature = generateSignature(
      razorpay_order_id,
      razorpay_payment_id
    );

    if (razorpay_signature === generated_signature) {
      if (participant.paymentStatus !== "paid") {
        participant.paymentStatus = "paid";
        await participant.save();

        // Only reduce ticket count when payment is confirmed
        if (event.ticketsAvailable > 0) {
          event.ticketsAvailable -= 1;
          await event.save();
        }
      }

      return res.json({ success: true });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Signature mismatch" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ error: "Payment verification failed" });
  }
});

module.exports = router;
