const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Hashed password (Using bcrypt)
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  goals: {
    type: String,
    default: "Maintain Weight",
  },
  allergies: {
    type: [String],
    default: [],
  },
  dailyCalorieGoal: {
    type: Number,
    default: 2000,
  },
  achievements: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
