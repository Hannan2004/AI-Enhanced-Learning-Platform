import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import "./CareerPredictionForm.css";

const CareerPredictionForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [educationLevel, setEducationLevel] = useState("Schooling");
  const [formFields, setFormFields] = useState({});

  // Handle education level change
  const handleEducationLevelChange = (e) => {
    setEducationLevel(e.target.value);
    setFormFields({}); // Reset dynamic fields for the new level
  };

  // Handle input change for dynamic fields
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      dob,
      educationLevel,
      ...(educationLevel === "Schooling" ? { schooling: formFields } : {}),
      ...(educationLevel === "Undergraduate" ? { undergraduate: formFields } : {}),
      ...(educationLevel === "Working Professional" ? { workingProfessional: formFields } : {}),
    };

    try {
      const response = await axios.post("http://localhost:3001/api/career-prediction", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Form submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Check console for details.");
    }
  };

  return (
    <div className="body">
      <Header />
      <section className="form-section">
        <div className="form-container">
          <div className="form-box">
            <form onSubmit={handleSubmit}>
              <h2 className="form-title">Career Prediction Form</h2>

              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name here"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email here"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Highest Educational Qualification</label>
                <div className="form-radio-group">
                  <label className="form-radio-label">
                    <input
                      type="radio"
                      value="Schooling"
                      checked={educationLevel === "Schooling"}
                      onChange={handleEducationLevelChange}
                      className="form-radio-input"
                    />
                    Schooling
                  </label>
                  <label className="form-radio-label">
                    <input
                      type="radio"
                      value="Undergraduate"
                      checked={educationLevel === "Undergraduate"}
                      onChange={handleEducationLevelChange}
                      className="form-radio-input"
                    />
                    Undergraduate
                  </label>
                  <label className="form-radio-label">
                    <input
                      type="radio"
                      value="Working Professional"
                      checked={educationLevel === "Working Professional"}
                      onChange={handleEducationLevelChange}
                      className="form-radio-input"
                    />
                    Working Professional
                  </label>
                </div>
              </div>

              {/* Conditional Fields */}
              {educationLevel === "Schooling" && (
                <>
                  <div className="form-group">
                    <label className="form-label">Current Grade</label>
                    <input
                      type="text"
                      name="currentGrade"
                      value={formFields.currentGrade || ""}
                      onChange={handleFieldChange}
                      placeholder="Enter your current grade"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Marks in 10th</label>
                    <input
                      type="number"
                      name="marks10"
                      value={formFields.marks10 || ""}
                      onChange={handleFieldChange}
                      placeholder="Enter your marks in 10th"
                      className="form-input"
                    />
                  </div>
                </>
              )}

              {educationLevel === "Undergraduate" && (
                <>
                  <div className="form-group">
                    <label className="form-label">Degree Status</label>
                    <input
                      type="text"
                      name="degreeStatus"
                      value={formFields.degreeStatus || ""}
                      onChange={handleFieldChange}
                      placeholder="Enter your degree status"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Specialization</label>
                    <input
                      type="text"
                      name="specialization"
                      value={formFields.specialization || ""}
                      onChange={handleFieldChange}
                      placeholder="Enter your specialization"
                      className="form-input"
                    />
                  </div>
                </>
              )}

              {educationLevel === "Working Professional" && (
                <>
                  <div className="form-group">
                    <label className="form-label">Years of Experience</label>
                    <input
                      type="number"
                      name="experienceYears"
                      value={formFields.experienceYears || ""}
                      onChange={handleFieldChange}
                      placeholder="Enter your years of experience"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Experience Description</label>
                    <textarea
                      name="experienceDescription"
                      value={formFields.experienceDescription || ""}
                      onChange={handleFieldChange}
                      placeholder="Describe your experience"
                      className="form-textarea"
                    ></textarea>
                  </div>
                </>
              )}

              <button type="submit" className="form-submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CareerPredictionForm;
