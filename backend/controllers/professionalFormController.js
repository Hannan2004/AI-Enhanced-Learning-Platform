const fs = require('fs');
const path = require('path');
const ProfessionalForm = require('../models/ProfessionalFormModel');

const submitProfessionalForm = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      dob,
      gender,
      contactNumber,
      location,
      company,
      position,
      yearsOfExperience,
      domainExpertise,
      coursesCertifications,
      achievements,
      skills,
    } = req.body;

    // Create and save the new professional form
    const formData = new ProfessionalForm({
      userId,
      firstName,
      lastName,
      dob,
      gender,
      contactNumber,
      location,
      company,
      position,
      yearsOfExperience,
      domainExpertise,
      coursesCertifications,
      achievements,
      skills,
    });

    await formData.save();

    // Write the user information to a JSON file
    const professionalDetailsPath = path.join(__dirname, '../data/professionalDetails.json');
    const professionalDetails = {
      userId,
      firstName,
      lastName,
      dob,
      gender,
      contactNumber,
      location,
      company,
      position,
      yearsOfExperience,
      domainExpertise,
      coursesCertifications,
      achievements,
      skills,
    };

    fs.readFile(professionalDetailsPath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading professionalDetails.json:', err);
        return res.status(500).json({ message: 'Error saving professional details' });
      }

      const professionalDetailsArray = data ? JSON.parse(data) : [];
      professionalDetailsArray.push(professionalDetails);

      fs.writeFile(professionalDetailsPath, JSON.stringify(professionalDetailsArray, null, 2), (err) => {
        if (err) {
          console.error('Error writing to professionalDetails.json:', err);
          return res.status(500).json({ message: 'Error saving professional details' });
        }

        res.status(201).json({ message: 'Professional form submitted successfully', formData });
      });
    });
  } catch (error) {
    console.error('Error submitting professional form:', error);
    res.status(500).json({ message: 'Failed to submit professional form' });
  }
};

module.exports = { submitProfessionalForm };