const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Participant = require("../models/participant.model");
const sendTicketEmail = require("../config/emailService"); // Ensure this is correctly implemented
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

// Route to create a Razorpay order and participant
router.post("/create-order", async (req, res) => {
  try {
    const { name, email, phone, eventId, amount } = req.body;

    if (!eventId) {
      return res.status(400).json({ error: "eventId is required" });
    }

    // Generate a unique ticket number
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

    // Save participant in MongoDB
    const participant = await Participant.create({
      name,
      email,
      phone,
      eventId,
      ticketNumber,
      razorpayOrderId: order.id, // Save Razorpay order ID
    });

    // Send email with the ticket to the participant
    // sendTicketEmail(email, ticketNumber, participant); // Make sure this function is properly implemented

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
    // Find participant using the Razorpay order ID
    const participant = await Participant.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }

    const generated_signature = generateSignature(
      razorpay_order_id,
      razorpay_payment_id
    );

    // Compare generated signature with the received one
    if (razorpay_signature === generated_signature) {
      // Update participant's payment status
      participant.paymentStatus = "paid";
      await participant.save();

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
