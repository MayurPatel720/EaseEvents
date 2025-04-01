const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Event = require("../models/event.model");

router.get("/dashboard-analytics", async (req, res) => {
    try {
        const { userid } = req.query; 

        if (!userid) {
            return res.status(400).json({ error: "User ID is required as a query parameter" });
        }
        
        // const events = await Event.find({ createdBy: userid })

        const events = await Event.find({ createdBy: userid }).select("title date ticketCategory ticketPrice participants");
        
        const totalEvents = events.length;

        const totalRegistrations = events.reduce((sum, event) => sum + (event.participants?.length || 0), 0);

        const totalMoney = events.reduce((sum, event) => {
            if (event.ticketCategory === "paid") {
                const soldTickets = event.participants?.length || 0;
                return sum + (soldTickets * (Number(event.ticketPrice) || 0));
            }
            return sum;
        }, 0);

        res.status(200).json({
            totalEvents,
            totalRegistrations,
            totalMoney,
            events: events.map(event => ({
                _id: event._id,
                title: event.title,
                date: event.date,
                ticketCategory: event.ticketCategory,
                ticketPrice: event.ticketPrice,
                registrations: event.participants?.length || 0
            }))
        });

    } catch (error) {
        console.error(`[Dashboard Analytics] Error for user ${req.query.userid}:`, error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

module.exports = router;
