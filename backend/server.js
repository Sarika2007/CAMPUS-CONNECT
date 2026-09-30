const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Home test route
app.get("/", (req, res) => {
    res.send("Campus Connect Backend is Running 🚀");
});

// New server test route
app.get("/hello", (req, res) => {
    res.json({
        message: "NEW SERVER IS WORKING"
    });
});

// Authentication routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});