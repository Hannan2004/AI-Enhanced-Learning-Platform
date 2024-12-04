const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');


require('dotenv').config();

const { Signup } = require('./models/signupModel');
const { Login } = require('./models/loginModel');
const CareerPrediction = require('./models/CareerPredictionModel');

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




// Authentication Routes
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

// Career Prediction Route


// Authentication Routes
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

// Career Prediction Routes
app.post('/api/career-prediction', async (req, res) => {
  const {
      name,
      email,
      dob,
      educationLevel,
      schooling,
      undergraduate,
      workingProfessional,
  } = req.body;

  try {
      // Validation logic
      if (educationLevel === 'Schooling' && !schooling) {
          return res.status(400).json({ error: 'Schooling details are required for Schooling level.' });
      }

      if (educationLevel === 'Undergraduate' && !undergraduate) {
          return res.status(400).json({ error: 'Undergraduate details are required for Undergraduate level.' });
      }

      if (educationLevel === 'Working Professional' && !workingProfessional) {
          return res.status(400).json({ error: 'Working Professional details are required for Working Professional level.' });
      }

      // Save to database
      const careerPrediction = new CareerPrediction({
          name,
          email,
          dob,
          educationLevel,
          schooling,
          undergraduate,
          workingProfessional,
      });

      await careerPrediction.save();
      res.status(201).json({ message: 'Career Prediction record saved successfully' });
  } catch (error) {
      console.error('Error in /career-prediction:', error.message);
      res.status(500).json({ error: error.message });
  }
});

app.post('/api/career-prediction', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const prediction = new CareerPrediction(req.body);
    await prediction.save();
    res.status(201).send({ message: 'Career Prediction saved successfully' });
  } catch (error) {
    console.error('Error in saving career prediction:', error.message);
    res.status(500).send({ error: error.message });
  }
});


app.get('/api/career-prediction/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const prediction = await CareerPrediction.findById(id);
      if (!prediction) {
          return res.status(404).json({ error: "Record not found" });
      }
      res.json(prediction);
  } catch (error) {
      console.error("Error in GET /career-prediction/:id:", error.message);
      res.status(500).json({ error: error.message });
  }
});

app.put('/api/career-prediction/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
      const updatedPrediction = await CareerPrediction.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedPrediction) {
          return res.status(404).json({ error: "Record not found" });
      }
      res.json({ message: "Record updated successfully", updatedPrediction });
  } catch (error) {
      console.error("Error in PUT /career-prediction/:id:", error.message);
      res.status(500).json({ error: error.message });
  }
});

app.delete('/api/career-prediction/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deletedPrediction = await CareerPrediction.findByIdAndDelete(id);
      if (!deletedPrediction) {
          return res.status(404).json({ error: "Record not found" });
      }
      res.json({ message: "Record deleted successfully" });
  } catch (error) {
      console.error("Error in DELETE /career-prediction/:id:", error.message);
      res.status(500).json({ error: error.message });
  }
});

// Other Routes
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



// Other existing routes
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});