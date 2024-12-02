import React from "react";
import { useNavigate } from "react-router-dom";

export default function AptitudeLandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/numerical-ability");
  };

  return (
    <div className="min-h-screen bg-blue-500 flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Aptitude Test</h1>
      <p className="mb-6 text-lg">Test your skills across various categories.</p>
      <button
        onClick={handleStart}
        className="px-6 py-3 bg-gray-800 rounded-md text-white font-semibold hover:bg-gray-600"
      >
        Start Test
      </button>
    </div>
  );
}
