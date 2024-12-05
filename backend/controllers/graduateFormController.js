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
            skills  
        } = req.body;

        console.log('Received form data:', req.body);

        const formData = await GraduateForm.create({
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
            skills
        });

        await formData.save();
        console.log('Form data saved:', formData); // Debugging log

        res.status(201).json({ message: 'Graduate form submitted successfully', formData });  
    } catch (error) {
        console.error('Error submitting graduate form:', error);
        res.status(500).json({ error: 'Failed to submit graduate form' });
    }
};

module.exports = { submitGraduateForm };