const mongoose = require('mongoose');

// Sub-schema for Schooling Level
const SchoolingSchema = new mongoose.Schema({
  currentGrade: { type: String, required: false }, // Example: "10th Grade"
  marks10: { type: Number, required: false }, // Marks for 10th grade
  marks12: { type: Number, required: false }, // Marks for 12th grade (optional)
  hobbiesSkills: { type: String, required: false }, // Example: "Playing chess, singing"
  achievements: { type: String, required: false }, // Example: "Won a math competition"
});

// Sub-schema for Undergraduate Level
const UndergraduateSchema = new mongoose.Schema({
  marks10: { type: Number, required: false }, // Marks for 10th grade
  marks12: { type: Number, required: false }, // Marks for 12th grade
  degreeStatus: { type: String, required: false }, // Example: "Completed", "In Progress"
  yearOfDegree: { type: Number, required: false }, // Example: 2022
  specialization: { type: String, required: false }, // Example: "Computer Science"
  skills: { type: String, required: false }, // Example: "Programming, Data Analysis"
  achievements: { type: String, required: false }, // Example: "Published research paper"
  resumePath: { type: String, required: false }, // Path to resume file
  experience: { type: String, required: false }, // Example: "Internship at ABC Corp"
});

// Sub-schema for Working Professionals
const WorkingProfessionalSchema = new mongoose.Schema({
  marks10: { type: Number, required: false }, // Marks for 10th grade
  marks12: { type: Number, required: false }, // Marks for 12th grade
  degreeStatus: { type: String, required: false }, // Example: "Completed"
  yearOfDegree: { type: Number, required: false }, // Example: 2012
  specialization: { type: String, required: false }, // Example: "Mechanical Engineering"
  skills: { type: String, required: false }, // Example: "Team Management, Leadership"
  achievements: { type: String, required: false }, // Example: "Employee of the Year"
  resumePath: { type: String, required: false }, // Path to resume file
  experienceYears: { type: Number, required: false }, // Total years of experience
  experienceDescription: { type: String, required: false }, // Detailed description of experience
});

// Main Career Prediction Schema
const CareerPredictionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  email: { type: String, required: true, unique: true }, // User's email
  dob: { type: Date, required: true }, // Date of Birth
  educationLevel: {
    type: String,
    enum: ['Schooling', 'Undergraduate', 'Working Professional'],
    required: true,
  }, // Education Level
  schooling: { type: SchoolingSchema, default: () => ({}) }, // Data for Schooling level
  undergraduate: { type: UndergraduateSchema, default: () => ({}) }, // Data for Undergraduate level
  workingProfessional: { type: WorkingProfessionalSchema, default: () => ({}) }, // Data for Working Professional level
  createdAt: { type: Date, default: Date.now }, // Timestamp for document creation
});

// Middleware for Conditional Validation
CareerPredictionSchema.pre('save', function (next) {
  const doc = this;

  // Validation for Schooling
  if (doc.educationLevel === 'Schooling' && !doc.schooling.currentGrade) {
    return next(new Error('Current Grade is required for Schooling.'));
  }

  // Validation for Undergraduate
  if (doc.educationLevel === 'Undergraduate' && !doc.undergraduate.degreeStatus) {
    return next(new Error('Degree Status is required for Undergraduate.'));
  }

  // Validation for Working Professional
  if (doc.educationLevel === 'Working Professional' && !doc.workingProfessional.experienceYears) {
    return next(new Error('Experience Years is required for Working Professional.'));
  }

  next();
});

// Export the Model
module.exports = mongoose.model('CareerPrediction', CareerPredictionSchema);
