const fs = require('fs');
const path = require('path');
const GraduateForm = require('../models/GraduateFormModel');

const submitGraduateForm = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      dob,
      gender,
      contactNumber,
      location,
      college,
      degree,
      graduationYear,
      cgpa,
      internshipWorkExp,
      achievements,
      skills,
    } = req.body;

    // Create and save the new graduate form
    const formData = new GraduateForm({
      userId,
      firstName,
      lastName,
      dob,
      gender,
      contactNumber,
      location,
      college,
      degree,
      graduationYear,
      cgpa,
      internshipWorkExp,
      achievements,
      skills,
    });

    await formData.save();

    // Write the user information to a JSON file
    const graduateDetailsPath = path.join(__dirname, '../data/graduateDetails.json');
    const graduateDetails = {
      userId,
      firstName,
      lastName,
      dob,
      gender,
      contactNumber,
      location,
      college,
      degree,
      graduationYear,
      cgpa,
      internshipWorkExp,
      achievements,
      skills,
    };

    fs.readFile(graduateDetailsPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading graduateDetails.json:', err);
        return res.status(500).json({ message: 'Error saving graduate details' });
      }

      const graduateDetailsArray = data ? JSON.parse(data) : [];
      graduateDetailsArray.push(graduateDetails);

      fs.writeFile(graduateDetailsPath, JSON.stringify(graduateDetailsArray, null, 2), (err) => {
        if (err) {
          console.error('Error writing to graduateDetails.json:', err);
          return res.status(500).json({ message: 'Error saving graduate details' });
        }

        res.status(201).json({ message: 'Graduate form submitted successfully', formData });
      });
    });
  } catch (error) {
    console.error('Error submitting graduate form:', error);
    res.status(500).json({ message: 'Failed to submit graduate form' });
  }
};

module.exports = { submitGraduateForm };