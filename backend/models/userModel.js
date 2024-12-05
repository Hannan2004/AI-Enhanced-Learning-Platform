const mongoose = require("mongoose");

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    enum: ["10th Grade Student", "Graduate/Undergraduate", "Professional"], 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
