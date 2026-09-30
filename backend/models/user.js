const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        college: {
            type: String,
            default: ""
        },

        branch: {
            type: String,
            default: ""
        },

        year: {
            type: String,
            default: ""
        },

        skills: {
            type: [String],
            default: []
        },

        interests: {
            type: [String],
            default: []
        },

        bio: {
            type: String,
            default: ""
        },

        role: {
            type: String,
            default: "student"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);