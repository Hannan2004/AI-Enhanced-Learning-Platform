const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Vijay:j9O5xAXhm3JxkqjS@cluster0.3qrm8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
