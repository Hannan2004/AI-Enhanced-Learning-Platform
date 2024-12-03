const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Signup } = require('./models/signupModel');
const { Login } = require('./models/loginModel');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

connectDB();

// Signup Route
app.post('/api/auth/signup', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {
        const user = new Signup({ email, password, confirmPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in /signup:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Signup.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error("Error in /login:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Other routes and logic
app.post('/counseling', async (req, res) => {
    const { input, context } = req.body;

    try {
        console.log('Received /counseling request:', req.body);
        const result = await careerCounseling(input, context);
        console.log('Error:', result);
        res.json(result);
    } catch (error) {
        console.error('Error in /counseling:', error);
        res.status(500).send(error.message);
    }
});

app.post('/generateNumerical', async (req, res) => {
    const { type } = req.body;

    try {
        console.log('Received /generateNumerical request:', req.body);
        const result = await generateNumericalQuestions(type);
        res.json(result);
    } catch (error) {
        console.error('Error in /generateNumerical:', error.message);
        res.status(500).send(error.message);
    }    
});

app.post('/generateVerbal', async (req, res) => {
    const { type } = req.body;

    try {
        console.log('Received /generateVerbal request:', req.body);
        const result = await generateVerbalQuestions(type);
        res.json(result);
    } catch (error) {
        console.error('Error in /generateVerbal:', error.message);
        res.status(500).send(error.message);
    }    
});

app.post('/generateLogical', async (req, res) => {
    const { type } = req.body;

    try {
        console.log('Received /generateLogical request:', req.body);
        const result = await generateLogicalQuestions(type);
        res.json(result);
    } catch (error) {
        console.error('Error in /generateLogical:', error.message);
        res.status(500).send(error.message);
    }    
});

/* app.post('/generateSpatial', async (req, res) => {
    const { type } = req.body;

    try {
        console.log('Received /generateSpatial request:', req.body);
        const result = await generateSpatialQuestions(type);
        res.json(result);
    } catch (error) {
        console.error('Error in /generateSpatial:', error.message);
        res.status(500).send(error.message);
    }    
});*/

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});