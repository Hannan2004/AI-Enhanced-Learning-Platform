import React from 'react';

const JobCard = ({ job, onViewDetails }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <img src={job.image} alt={job.title} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h2 className="text-xl font-bold mb-2">{job.title}</h2>
      <p className="text-gray-700 mb-4">{job.company}</p>
      <button
        onClick={() => onViewDetails(job)}
        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        View Details
      </button>
    </div>
  );
};

export default JobCard;