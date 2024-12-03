const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email address",            
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
});

const Login = mongoose.model("Login", loginSchema);
module.exports = { Login };