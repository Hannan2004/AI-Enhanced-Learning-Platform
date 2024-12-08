import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [jobRole, setJobRole] = useState('');
  const [techStack, setTechStack] = useState('');
  const [experience, setExperience] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/interview-questions', { state: { jobRole, techStack, experience } });
  };

  return (
    <div className="home">
      <h1>Mock Interview</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Job Role" value={jobRole} onChange={(e) => setJobRole(e.target.value)} required />
        <input type="text" placeholder="Tech Stack" value={techStack} onChange={(e) => setTechStack(e.target.value)} required />
        <input type="number" placeholder="Experience (years)" value={experience} onChange={(e) => setExperience(e.target.value)} required />
        <button type="submit">Start Interview</button>
      </form>
    </div>
  );
};

export default Home;
