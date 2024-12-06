const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const { generateRecommendations } = require('./generateRecommendations');
const { startInterview } = require('./mockinterview');
const { generateNumericalQuestions } = require('./generateNumerical');
const { generateLogicalQuestions } = require('./generateLogical');  
const { generateVerbalQuestions } = require('./generateVerbal');
const { generateSkillGap } = require('./skillGap');

const { careerCounseling } = require('./careerCounseling'); // Adjust the path as necessary

const app = express();
const port = 3001;

const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(cors());

// Mock Interview Route 
app.post('/start-interview', async (req, res) => {
    try {
        const userInput = req.body.userInput;
        if (!userInput) {
            return res.status(400).json({ error: 'User input is required' });
        }

        const interviewResponse = await startInterview(userInput);
        res.json({ interviewResponse });
    } catch (error) {
        console.error('Error in /start-interview:', error);
        res.status(500).json({ error: 'Interview failed' });
    }
});

// Other routes and logic
app.post('/counseling', async (req, res) => {
    const { input, context } = req.body;

    if (!input || !context) {
        return res.status(400).json({ error: 'Input and context are required' });
    }

    try {
        console.log('Received /counseling request:', req.body);
        const result = await careerCounseling(input, context);
        res.json(result);
    } catch (error) {
        console.error('Error in /counseling:', error);
        res.status(500).json({ error: 'Failed to perform career counseling' });
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

app.post('/generateRecommendations', upload.single('report'), async (req, res) => {
    try {
        console.log('Received /generateRecommendations request:', req.file);
        const filePath = req.file.path;
        const mimeType = req.file.mimetype;
        const recommendations = await generateRecommendations(filePath, mimeType);
        console.log('Career recommendations:', recommendations);
        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).send({ error: 'An error occurred while generating recommendations.' });
    }
});

app.post('/generateSkillGap', async (req, res) => {
    try {
      const { userInput } = req.body;
  
      if (!userInput) {
        return res.status(400).json({ error: "userInput is required" });
      }
  
      const skillGapAnalysis = await generateSkillGap(userInput);
      res.status(200).json({ skillGapAnalysis });
    } catch (error) {
      console.error("Error in generateSkillGap:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



