const mongoose = require('mongoose');

const professionalFormSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
  contactNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, // Validates 10-digit phone numbers
  },
  location: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  yearsOfExperience : {
    type: Number,
    required: true,
    min: 0,
    max: 40,
  },
  domainExpertise: {
    type: [String], // Array of strings to hold multiple domain expertise
    required: true,
  },
  coursesCertifications: {
    type: [String], // Array of strings to hold multiple courses and certifications
  },
  achievements: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProfessionalForm = mongoose.model('ProfessionalForm', professionalFormSchema);

module.exports = ProfessionalForm;