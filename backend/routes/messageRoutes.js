const express = require("express");

const router = express.Router();

const Message = require("../models/Message");

// POST - Save contact message
router.post("/", async (req, res) => {
    try {
        const {
            name,
            email,
            subject,
            message
        } = req.body;

        // Check required fields
        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Create message
        const newMessage = new Message({
            name,
            email,
            subject,
            message
        });

        // Save to MongoDB
        await newMessage.save();

        res.status(201).json({
            success: true,
            message: "Message saved successfully ✅",
            data: newMessage
        });

    } catch (error) {
        console.error(
            "Message save error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

module.exports = router;