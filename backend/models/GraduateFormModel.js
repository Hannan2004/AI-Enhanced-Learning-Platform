const mongoose = require('mongoose');

const graduateFormSchema = new mongoose.Schema({
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
  college: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  internshipWorkExp: {
    type: [String],
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

const GraduateForm = mongoose.model('GraduateForm', graduateFormSchema);

module.exports = GraduateForm;