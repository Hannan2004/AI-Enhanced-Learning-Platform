import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import spatialQuestions from '../assets/json/spatial_reasoning.json'; // Adjust the path as necessary

const SpatialReasoning = ({ setScores }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleNext();
    }
  }, [quizStarted, timeLeft]);

  const startQuiz = () => {
    setLoading(true);
    try {
      setQuestions(spatialQuestions);
      setQuizStarted(true);
    } catch (error) {
      console.error('Error loading questions:', error);
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(60);
    } else {
      let calculatedScore = 0;
      questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
          calculatedScore += 1;
        }
      });
      setScores(prevScores => ({ ...prevScores, spatial: calculatedScore }));
      navigate('/results');
    }
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-6">Spatial Reasoning Test</h1>
          <button
            onClick={startQuiz}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? <ClipLoader color="#ffffff" size={24} /> : 'Start Quiz'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Spatial Reasoning Test</h1>
        <div className="mb-4 p-4 bg-purple-500 text-white rounded-lg shadow-md">
          {questions[currentQuestionIndex].question.map((content, index) => (
            content.type === 'text' ? (
              <p key={index} className="mb-2 font-semibold">{content.content}</p>
            ) : (
              <img key={index} src={content.content} alt="Question" className="mb-4 w-full h-auto rounded-lg" />
            )
          ))}
          {questions[currentQuestionIndex].options.map((option, optionIndex) => (
            <div key={optionIndex} className="mb-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option.id}
                  checked={userAnswers[currentQuestionIndex] === option.id}
                  onChange={() => handleAnswerChange(currentQuestionIndex, option.id)}
                  className="form-radio"
                />
                <img src={option.content} alt={`Option ${option.id}`} className="ml-2 w-16 h-16 rounded-lg" />
              </label>
            </div>
          ))}
        </div>
        <div className="text-center mb-4">
          <p className="text-xl font-bold">Time Left: {timeLeft}s</p>
        </div>
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

export default SpatialReasoning;