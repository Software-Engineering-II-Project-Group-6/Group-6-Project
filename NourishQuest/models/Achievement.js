const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Achievement", achievementSchema);
