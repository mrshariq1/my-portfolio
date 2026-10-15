const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const messageRoutes = require("./messageRoutes");

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Portfolio Backend is Running 🚀"
    });
});

// API routes without strict DB dependency


// API
app.use("/api/messages", messageRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;