import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogicalReasoning = ({ setScores }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const startQuiz = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/generateLogical', { type: 'logical-reasoning' });
      console.log('API Response:', response.data); // Debugging log
      const parsedResponse = JSON.parse(response.data.response);
      if (Array.isArray(parsedResponse)) {
        setQuestions(parsedResponse);
      } else {
        console.error('Unexpected response format:', parsedResponse);
      }
      setQuizStarted(true);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer,
    });
  };

  const handleNext = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScores(prevScores => ({ ...prevScores, logical: calculatedScore }));
    navigate('/results');
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-6">Logical Reasoning Test</h1>
          <button
            onClick={startQuiz}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Start Quiz'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Logical Reasoning Test</h1>
        {questions.map((question, index) => (
          <div key={index} className="mb-4 p-4 bg-blue-50 rounded-lg shadow-md">
            <p className="mb-2 font-semibold">{question.question}</p>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                    className="form-radio"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              </div>
            ))}
          </div>
        ))}
        <button
          onClick={handleNext}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LogicalReasoning;