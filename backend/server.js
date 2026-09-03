const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(
    cors({
        origin: [
            "https://my-portfolio-two-inky-55.vercel.app",
            "http://localhost:3000"
        ],
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["Content-Type"]
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio Backend is Running 🚀"
    });
});

// Connect DB before API
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

// API
app.use("/api/messages", messageRoutes);

module.exports = app;