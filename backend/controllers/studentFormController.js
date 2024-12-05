const fs = require('fs');
const path = require('path');
const StudentForm = require('../models/StudentFormModel');

const submitStudentForm = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      dob,
      gender,
      contactNumber,
      location,
      school,
      percentage,
      favoriteSubjects,
      extraCurricular,
      achievements,
      learningPreferences,
      skills,
    } = req.body;

    // Create and save the new student form
    const formData = new StudentForm({
      userId,
      firstName,
      lastName,
      dob,
      gender,
      contactNumber,
      location,
      school,
      percentage,
      favoriteSubjects,
      extraCurricular,
      achievements,
      learningPreferences,
      skills,
    });

    await formData.save();

    // Write the user information to a JSON file
    const studentDetailsPath = path.join(__dirname, '../data/studentDetails.json');
    const studentDetails = {
      userId,
      firstName,
      lastName,
      dob,
      gender,
      contactNumber,
      location,
      school,
      percentage,
      favoriteSubjects,
      extraCurricular,
      achievements,
      learningPreferences,
      skills,
    };

    fs.readFile(studentDetailsPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading studentDetails.json:', err);
        return res.status(500).json({ message: 'Error saving student details' });
      }

      const studentDetailsArray = data ? JSON.parse(data) : [];
      studentDetailsArray.push(studentDetails);

      fs.writeFile(studentDetailsPath, JSON.stringify(studentDetailsArray, null, 2), (err) => {
        if (err) {
          console.error('Error writing to studentDetails.json:', err);
          return res.status(500).json({ message: 'Error saving student details' });
        }

        res.status(201).json({ message: 'Student form submitted successfully', formData });
      });
    });
  } catch (error) {
    console.error('Error submitting student form:', error);
    res.status(500).json({ message: 'Failed to submit student form' });
  }
};

module.exports = { submitStudentForm };