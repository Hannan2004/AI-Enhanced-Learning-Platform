import React, { useState } from 'react';
import Header from '../components/Navbar.js'; // Correct the Header component path
import Footer from '../components/Footer.js'; // Correct the Footer component path

const CareerPredictionForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [currentGrade, setCurrentGrade] = useState('');
  const [marks10, setMarks10] = useState('');
  const [marks12, setMarks12] = useState('');
  const [hobbiesSkills, setHobbiesSkills] = useState('');
  const [achievements, setAchievements] = useState('');

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
    console.log('Hobbies & Skills:', hobbiesSkills);
    console.log('Achievements:', achievements);
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #ebf8ff, #c3dafe)', color: '#2d3748', minHeight: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <Header /> {/* Use the Header component */}

      {/* Form Section */}
      <section style={{ textAlign: 'center', padding: '5rem 0', background: 'linear-gradient(to bottom, #c3dafe, #ebf8ff)', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', borderRadius: '0.5rem', padding: '2rem', marginRight: '2rem' }}>
            <div>
              <form onSubmit={handleSubmit}>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Career Prediction Form</h2>
                <div style={{ marginBottom: '1.5rem', border: '1px solid #cbd5e0', borderRadius: '0.5rem', padding: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', fontWeight: 'bold' }}>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name here"
                    style={{ width: 'calc(100% - 1rem)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0' }}
                    required
                  />
                </div>
                <div style={{ marginBottom: '1.5rem', border: '1px solid #cbd5e0', borderRadius: '0.5rem', padding: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', fontWeight: 'bold' }}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email here"
                    style={{ width: 'calc(100% - 1rem)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0' }}
                    required
                  />
                </div>
                <div style={{ marginBottom: '1.5rem', border: '1px solid #cbd5e0', borderRadius: '0.5rem', padding: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', fontWeight: 'bold' }}>Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="Enter your date of birth here"
                    style={{ width: 'calc(100% - 1rem)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0' }}
                    required
                  />
                </div>
                <div style={{ marginBottom: '1.5rem', border: '1px solid #cbd5e0', borderRadius: '0.5rem', padding: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', fontWeight: 'bold' }}>Highest Educational Qualification</label>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <label style={{ color: '#4a5568', fontWeight: 'bold' }}>
                      <input
                        type="radio"
                        value="Schooling"
                        checked={educationLevel === 'Schooling'}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      Schooling
                    </label>
                    <label style={{ color: '#4a5568', fontWeight: 'bold' }}>
                      <input
                        type="radio"
                        value="Undergraduate"
                        checked={educationLevel === 'Undergraduate'}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      Undergraduate
                    </label>
                    <label style={{ color: '#4a5568', fontWeight: 'bold' }}>
                      <input
                        type="radio"
                        value="Working Professional"
                        checked={educationLevel === 'Working Professional'}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      Working Professional
                    </label>
                  </div>
                </div>
                {educationLevel === 'Schooling' && (
                  <>
                    <div style={{ marginBottom: '1.5rem', border: '1px solid #cbd5e0', borderRadius: '0.5rem', padding: '0.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', fontWeight: 'bold' }}>Current Grade</label>
                      <select
                        value={currentGrade}
                        onChange={(e) => setCurrentGrade(e.target.value)}
                        style={{ width: 'calc(100% - 1rem)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0' }}
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
                      <div style={{ marginBottom: '1.5rem', border: '1px solid #cbd5e0', borderRadius: '0.5rem', padding: '0.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', fontWeight: 'bold' }}>10th Marks</label>
                        <input
                          type="number"
                          value={marks10}
                          onChange={(e) => setMarks10(e.target.value)}
                          placeholder="Enter your 10th marks here"
                          style={{ width: 'calc(100% - 1rem)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0' }}
                          required
                        />
                      </div>
                    )}
                    {currentGrade === '12' && (
                      <div style={{ marginBottom: '1.5rem', border: '1px solid #cbd5e0', borderRadius: '0.5rem', padding: '0.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', fontWeight: 'bold' }}>12th Marks</label>
                        <input
                          type="number"
                          value={marks12}
                          onChange={(e) => setMarks12(e.target.value)}
                          placeholder="Enter your 12th marks here"
                          style={{ width: 'calc(100% - 1rem)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0' }}
                          required
                        />
                      </div>
                    )}
                    <div style={{ marginBottom: '1.5rem', border: '1px solid #cbd5e0', borderRadius: '0.5rem', padding: '0.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', fontWeight: 'bold' }}>Hobbies & Skills</label>
                      <textarea
                        value={hobbiesSkills}
                        onChange={(e) => setHobbiesSkills(e.target.value)}
                        placeholder="Enter your hobbies and skills here"
                        style={{ width: 'calc(100% - 1rem)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0', resize: 'vertical' }}
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <div style={{ marginBottom: '1.5rem', border: '1px solid #cbd5e0', borderRadius: '0.5rem', padding: '0.5rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568', fontWeight: 'bold' }}>Achievements</label>
                      <textarea
                        value={achievements}
                        onChange={(e) => setAchievements(e.target.value)}
                        placeholder="Enter your achievements here"
                        style={{ width: 'calc(100% - 1rem)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0', resize: 'vertical' }}
                        rows="3"
                        required
                      ></textarea>
                    </div>
                  </>
                )}
                <button type="submit" style={{ backgroundColor: '#4c51bf', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', width: '100%' }}>
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