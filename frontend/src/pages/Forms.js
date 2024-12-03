import React, { useState } from 'react';
import Header from '../components/Navbar.js'; // Correct the Header component path
import Footer from '../components/Footer.js'; // Correct the Footer component path
import './CareerPredictionForm.css'; // Import the CSS file

const CareerPredictionForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [currentGrade, setCurrentGrade] = useState('');
  const [marks10, setMarks10] = useState('');
  const [marks12, setMarks12] = useState('');
  const [degreeStatus, setDegreeStatus] = useState('');
  const [yearOfDegree, setYearOfDegree] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [achievements, setAchievements] = useState('');
  const [resume, setResume] = useState(null);
  const [experience, setExperience] = useState('');
  const [hobbiesSkills, setHobbiesSkills] = useState(''); // Add these state variables
  const [experienceYears, setExperienceYears] = useState('');
  const [experienceDescription, setExperienceDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Date of Birth:', dob);
    console.log('Education Level:', educationLevel);
    console.log('Current Grade:', currentGrade);
    console.log('10th Marks:', marks10);
    console.log('12th Marks:', marks12);
    console.log('Degree Status:', degreeStatus);
    console.log('Year of Degree:', yearOfDegree);
    console.log('Specialization:', specialization);
    console.log('Achievements:', achievements);
    console.log('Resume:', resume);
    console.log('Experience:', experience);
    console.log('Hobbies & Skills:', hobbiesSkills); // Add this line
    console.log('Experience Years:', experienceYears);
    console.log('Experience Description:', experienceDescription);
  };

  return (
    <div className="body">
      <Header /> {/* Use the Header component */}

      {/* Form Section */}
      <section className="form-section">
        <div className="form-container">
          <div className="form-box">
            <div>
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
                    placeholder="Enter your date of birth here"
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
                        checked={educationLevel === 'Schooling'}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        className="form-radio-input"
                      />
                      Schooling
                    </label>
                    <label className="form-radio-label">
                      <input
                        type="radio"
                        value="Undergraduate"
                        checked={educationLevel === 'Undergraduate'}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        className="form-radio-input"
                      />
                      Undergraduate
                    </label>
                    <label className="form-radio-label">
                      <input
                        type="radio"
                        value="Working Professional"
                        checked={educationLevel === 'Working Professional'}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        className="form-radio-input"
                      />
                      Working Professional
                    </label>
                  </div>
                </div>
                {educationLevel === 'Schooling' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Current Grade</label>
                      <select
                        value={currentGrade}
                        onChange={(e) => setCurrentGrade(e.target.value)}
                        className="form-select"
                        required
                      >
                        <option value="">Select your current grade</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    {(currentGrade === '10' || currentGrade === '11' || currentGrade === '12') && (
                      <div className="form-group">
                        <label className="form-label">10th Marks</label>
                        <input
                          type="number"
                          value={marks10}
                          onChange={(e) => setMarks10(e.target.value)}
                          placeholder="Enter your 10th marks here"
                          className="form-input"
                          required
                        />
                      </div>
                    )}
                    {currentGrade === '12' && (
                      <div className="form-group">
                        <label className="form-label">12th Marks</label>
                        <input
                          type="number"
                          value={marks12}
                          onChange={(e) => setMarks12(e.target.value)}
                          placeholder="Enter your 12th marks here"
                          className="form-input"
                          required
                        />
                      </div>
                    )}
                    <div className="form-group">
                      <label className="form-label">Hobbies & Skills</label>
                      <textarea
                        value={hobbiesSkills}
                        onChange={(e) => setHobbiesSkills(e.target.value)}
                        placeholder="Enter your hobbies and skills here"
                        className="form-textarea"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Achievements</label>
                      <textarea
                        value={achievements}
                        onChange={(e) => setAchievements(e.target.value)}
                        placeholder="Enter your achievements here"
                        className="form-textarea"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                  </>
                )}
                {educationLevel === 'Undergraduate' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">10th Marks</label>
                      <input
                        type="number"
                        value={marks10}
                        onChange={(e) => setMarks10(e.target.value)}
                        placeholder="Enter your 10th marks here"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">12th Marks</label>
                      <input
                        type="number"
                        value={marks12}
                        onChange={(e) => setMarks12(e.target.value)}
                        placeholder="Enter your 12th marks here"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Degree Status</label>
                      <select
                        value={degreeStatus}
                        onChange={(e) => setDegreeStatus(e.target.value)}
                        className="form-select"
                        required
                      >
                        <option value="">Select degree status</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Year of Degree</label>
                      <input
                        type="number"
                        value={yearOfDegree}
                        onChange={(e) => setYearOfDegree(e.target.value)}
                        placeholder="Enter the year of your degree"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Specialization</label>
                      <input
                        type="text"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        placeholder="Enter your specialization"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Achievements</label>
                      <textarea
                        value={achievements}
                        onChange={(e) => setAchievements(e.target.value)}
                        placeholder="Enter your achievements here"
                        className="form-textarea"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Resume</label>
                      <input
                        type="file"
                        onChange={(e) => setResume(e.target.files[0])}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Experience (Optional)</label>
                      <textarea
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="Enter your experience here"
                        className="form-textarea"
                        rows="3"
                      ></textarea>
                    </div>
                  </>
                )}
                {educationLevel === 'Working Professional' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">10th Marks</label>
                      <input
                        type="number"
                        value={marks10}
                        onChange={(e) => setMarks10(e.target.value)}
                        placeholder="Enter your 10th marks here"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">12th Marks</label>
                      <input
                        type="number"
                        value={marks12}
                        onChange={(e) => setMarks12(e.target.value)}
                        placeholder="Enter your 12th marks here"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Degree Status</label>
                      <select
                        value={degreeStatus}
                        onChange={(e) => setDegreeStatus(e.target.value)}
                        className="form-select"
                        required
                      >
                        <option value="">Select degree status</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Year of Degree</label>
                      <input
                        type="number"
                        value={yearOfDegree}
                        onChange={(e) => setYearOfDegree(e.target.value)}
                        placeholder="Enter the year of your degree"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Specialization</label>
                      <input
                        type="text"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        placeholder="Enter your specialization"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Achievements</label>
                      <textarea
                        value={achievements}
                        onChange={(e) => setAchievements(e.target.value)}
                        placeholder="Enter your achievements here"
                        className="form-textarea"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Resume</label>
                      <input
                        type="file"
                        onChange={(e) => setResume(e.target.files[0])}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Experience in Years</label>
                      <input
                        type="number"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        placeholder="Enter your experience in years"
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Description of Experience</label>
                      <textarea
                        value={experienceDescription}
                        onChange={(e) => setExperienceDescription(e.target.value)}
                        placeholder="Enter your experience description (may include company name, job role)"
                        className="form-textarea"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                  </>
                )}
                <button type="submit" className="form-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer /> {/* Use the Footer component */}
    </div>
  );
};

export default CareerPredictionForm;