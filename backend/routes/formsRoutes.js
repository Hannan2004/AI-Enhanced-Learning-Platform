const express = require("express");
const { submitStudentForm } = require("../controllers/studentFormController");
const { submitGraduateForm } = require("../controllers/graduateFormController");
const { submitProfessionalForm } = require("../controllers/professionalFormController");

const router = express.Router();

// Route for 10th Grade Student Form Submission
router.post("/student", submitStudentForm);
router.post("/graduate", submitGraduateForm);
router.post("/professional", submitProfessionalForm);

module.exports = router;
