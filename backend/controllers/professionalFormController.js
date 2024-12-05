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
            skills
        } = req.body;

        console.log('Received form data:', req.body);

        const formData = await ProfessionalForm.create({
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
            skills
        });

        await formData.save();
        console.log('Form data saved:', formData); // Debugging log

        res.status(201).json({ message: 'Professional form submitted successfully', formData });  
    } catch (error) {
        console.error('Error submitting professional form:', error);
        res.status(500).json({ error: 'Failed to submit graduate form' });
    }
};

module.exports = { submitProfessionalForm };