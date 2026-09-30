const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

// Test route
router.get("/test", (req, res) => {
    res.json({
        message: "Auth routes are working"
    });
});

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

module.exports = router;