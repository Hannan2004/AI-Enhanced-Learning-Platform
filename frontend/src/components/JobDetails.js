import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobDetails = ({ job, onClose }) => {
  const navigate = useNavigate();

  const handleStartSkillTest = () => {
    navigate('/skill-gap-test', { state: { job } });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">{job.title}</h2>
        <p className="text-gray-700 mb-4">{job.company}</p>
        <p className="text-gray-700 mb-4">{job.description}</p>
        <h3 className="text-xl font-bold mb-2">Requirements</h3>
        <ul className="list-disc list-inside mb-4">
          {job.requirements.map((req, index) => (
            <li key={index} className="text-gray-700 mb-2">{req}</li>
          ))}
        </ul>
        <button
          onClick={handleStartSkillTest}
          className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 mb-4"
        >
          Check Skill Gap
        </button>
        <button
          onClick={onClose}
          className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default JobDetails;