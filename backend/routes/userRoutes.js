
const express = require("express");
const router = express.Router();

const User = require("../models/user");
const protect = require("../middleware/authMiddleware");

// GET: Fetch the logged-in student's own profile
router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user
        });
    } catch (error) {
        console.error("Fetch profile error:", error);
        res.status(500).json({
            message: "Unable to fetch profile"
        });
    }
});

// PUT: Save changes to the logged-in student's own profile
router.put("/profile", protect, async (req, res) => {
    try {
        const { name, college, branch, year, skills, interests, bio } = req.body;

        const updates = {};

        if (typeof name === "string") updates.name = name.trim();
        if (typeof college === "string") updates.college = college.trim();
        if (typeof branch === "string") updates.branch = branch.trim();
        if (typeof year === "string") updates.year = year.trim();
        if (typeof bio === "string") updates.bio = bio.trim();

        if (Array.isArray(skills)) {
            updates.skills = skills
                .filter(item => typeof item === "string")
                .map(item => item.trim())
                .filter(Boolean);
        } else if (typeof skills === "string") {
            updates.skills = skills.split(",").map(item => item.trim()).filter(Boolean);
        }

        if (Array.isArray(interests)) {
            updates.interests = interests
                .filter(item => typeof item === "string")
                .map(item => item.trim())
                .filter(Boolean);
        } else if (typeof interests === "string") {
            updates.interests = interests.split(",").map(item => item.trim()).filter(Boolean);
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updates },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile saved successfully",
            user
        });
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({
            message: "Unable to save profile"
        });
    }
});

module.exports = router;
