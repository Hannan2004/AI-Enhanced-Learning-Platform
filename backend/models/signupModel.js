const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const signupSchema = new mongoose.Schema({
  email : {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",      
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters long"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm Password is required"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

signupSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = undefined;
  }
  next();
});

const Signup = mongoose.model("Signup", signupSchema);
module.exports = { Signup };