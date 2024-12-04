import React, { useState } from 'react';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import MermaidRoadmap from '../components/MermaidRoadmap';

const SkillGapForm = () => {
  const [goal, setGoal] = useState('');
  const [currentSkills, setCurrentSkills] = useState([{ skill: '', level: '' }]);
  const [learningStyle, setLearningStyle] = useState('Online Courses');
  const [learningTime, setLearningTime] = useState('');
  const [responseData, setResponseData] = useState(null);

  // Add new skill row
  const addSkillRow = () => {
    setCurrentSkills([...currentSkills, { skill: '', level: '' }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInput = {
      goal,
      currentSkills,
      learningStyle,
      learningTime,
    };

    try {
      const response = await axios.post('http://localhost:3001/generateSkillGap', { userInput });
      setResponseData(response.data.skillGapAnalysis);
    } catch (error) {
      console.error('Error fetching skill gap analysis:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Skill Gap Analysis</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">What is your career goal?</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">What are your current skills and proficiency levels?</label>
            {currentSkills.map((skill, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Skill"
                  value={skill.skill}
                  onChange={(e) => {
                    const newSkills = [...currentSkills];
                    newSkills[index].skill = e.target.value;
                    setCurrentSkills(newSkills);
                  }}
                  className="w-1/2 p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Proficiency Level (e.g., Beginner, Intermediate, Advanced)"
                  value={skill.level}
                  onChange={(e) => {
                    const newSkills = [...currentSkills];
                    newSkills[index].level = e.target.value;
                    setCurrentSkills(newSkills);
                  }}
                  className="w-1/2 p-2 border border-gray-300 rounded-lg"
                />
              </div>
            ))}
            <button type="button" onClick={addSkillRow} className="mt-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Add Another Skill
            </button>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">What is your preferred learning style?</label>
            <select
              value={learningStyle}
              onChange={(e) => setLearningStyle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="Online Courses">Online Courses</option>
              <option value="Books">Books</option>
              <option value="In-person">In-person</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">How much time can you dedicate to learning each day or week?</label>
            <input
              type="text"
              value={learningTime}
              onChange={(e) => setLearningTime(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Submit
          </button>
        </form>

        {responseData && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Skill Gap Analysis</h2>
            <RadarChart data={responseData} />
            <MermaidRoadmap data={responseData} /> {/* Use the new component */}
          </div>
        )}
      </div>
    </div>
  );
};

// Component to render radar chart
const RadarChart = ({ data }) => {
  const radarData = {
    labels: data["Required Skills"].map((skill) => skill["Skill Name"]),
    datasets: [
      {
        label: 'Required Skills',
        data: data["Required Skills"].map((skill) => {
          if (skill["Proficiency Level"] === 'Basic') return 1;
          if (skill["Proficiency Level"] === 'Intermediate') return 2;
          if (skill["Proficiency Level"] === 'Advanced') return 3;
          return 0;
        }),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Current Skills',
        data: data["Current Skills"].map((skill) => {
          if (skill["Proficiency Level"] === 'Basic') return 1;
          if (skill["Proficiency Level"] === 'Intermediate') return 2;
          if (skill["Proficiency Level"] === 'Advanced') return 3;
          return 0;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mb-8">
      <Radar data={radarData} />
    </div>
  );
};

export default SkillGapForm;