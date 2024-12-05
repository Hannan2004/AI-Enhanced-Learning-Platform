const mongoose = require('mongoose');

const studentFormSchema = new mongoose.Schema({
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
  school: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  favoriteSubjects: {
    type: [String],
    required: true,
  },
  extraCurricular: {
    type: [String],
  },
  achievements: {
    type: [String],
  },
  learningPreferences: {
    type: [String],
    required: true,
    enum: ['Auditory', 'Visual', 'Practical'],
  },
  skills: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StudentForm = mongoose.model('StudentForm', studentFormSchema);

module.exports = StudentForm;