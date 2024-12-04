const express = require('express');
const router = express.Router();
const { Signup } = require('../models/signupModel'); // Adjust path as needed
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Check if user already exists
    const existingUsername = await Signup.findOne({ username });
    const existingEmail = await Signup.findOne({ email });

    if (existingUsername) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    if (existingEmail) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Create new user
    const newUser = new Signup({
      username,
      email,
      password,
      confirmPassword
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully',
      user: { username, email }
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors[0] });
    }

    res.status(500).json({ error: 'Server error during signup' });
  }
});

module.exports = router;