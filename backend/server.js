
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home test route
app.get("/", (req, res) => {
    res.send("Campus Connect Backend is Running 🚀");
});

// Server test route
app.get("/hello", (req, res) => {
    res.json({
        message: "NEW SERVER IS WORKING"
    });
});

// Authentication routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Start server only once
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", async () => {
    console.log(`Campus Connect server running on port ${PORT}`);

    try {
        await connectDB();
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
});
