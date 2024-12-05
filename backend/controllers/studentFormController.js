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
    } = req.body; // Ensure all necessary fields are passed in the request

    console.log('Received form data:', req.body); // Debugging log

    // Create and save the new student form
    const formData = await StudentForm.create({
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

    console.log('Form data saved:', formData); // Debugging log

    res.status(201).json({ message: 'Student form submitted successfully', formData });
  } catch (error) {
    console.error('Error submitting student form:', error);
    res.status(500).json({ error: 'Failed to submit student form' });
  }
};

module.exports = { submitStudentForm };