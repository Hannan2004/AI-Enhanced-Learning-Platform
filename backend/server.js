const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const { careerCounseling } = require('./careerCounseling');
const { generateNumericalQuestions } = require('./generateNumerical');
const { generateLogicalQuestions } = require('./generateLogical');  
const { generateVerbalQuestions } = require('./generateVerbal');
// const { generateSpatialQuestions } = require('./generateSpatial');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

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
})

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
})

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
})

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
})*/
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});