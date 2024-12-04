import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FlipCard = styled.div`
  background-color: transparent;
  width: 100%;
  height: 200px;
  perspective: 1000px;
  margin-bottom: 20px; /* Add margin to create spacing between cards */
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;

  ${FlipCard}:hover & {
    transform: rotateY(180deg);
  }
`;

const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const ReportUpload = () => {
  const [file, setFile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('report', file);

    try {
      const response = await axios.post('http://localhost:3001/generateRecommendations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setRecommendations(response.data.career_recommendations);
    } catch (error) {
      console.error('Error uploading report:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Upload Your Report</h1>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Upload
        </button>
      </form>
      <div className="mt-8 w-full max-w-3xl">
        {recommendations.map((rec, index) => (
          <FlipCard key={index}>
            <FlipCardInner>
              <FlipCardFront className="bg-blue-500 text-white p-4 rounded-lg">
                <h2 className="text-xl font-bold">{rec.career}</h2>
              </FlipCardFront>
              <FlipCardBack className="bg-gray-100 text-black p-4 rounded-lg">
                <p>{rec.reason}</p>
              </FlipCardBack>
            </FlipCardInner>
          </FlipCard>
        ))}
      </div>
    </div>
  );
};

export default ReportUpload;