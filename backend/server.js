const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

// CORS configuration to allow all origins safely
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use(express.json());

app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("Portfolio Backend is Running 🚀");
});

connectDB();

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;