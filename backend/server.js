const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("Portfolio Backend is Running 🚀");
});

// Database connection for Vercel/local
connectDB();

const PORT = process.env.PORT || 5000;

// Local development ke liye listen karein, Vercel ke liye export zaroori hai
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;