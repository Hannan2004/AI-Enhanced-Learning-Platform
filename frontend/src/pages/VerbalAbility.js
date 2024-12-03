import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const NumericalAbility = ({ setScores }) => {
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

  const startQuiz = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/generateNumerical', { type: 'numerical-ability' });
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
      setScores(prevScores => ({ ...prevScores, numerical: calculatedScore }));
      navigate('/verbal-ability');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-300">
        <ClipLoader size={150} color={"#4c51bf"} loading={loading} />
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-4">
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-6">Numerical Ability Test</h1>
          <button
            onClick={startQuiz}
            className="py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Start Quiz'}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-4">
      <Navbar />
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <AnimatePresence mode='wait'>
          <motion.div
            key="quiz-screen"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-2xl w-full bg-white shadow-2xl rounded-2xl p-8"
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-2xl font-bold text-center text-indigo-800 mb-4"
              >
                Numerical Ability Test
              </motion.h2>

              <motion.div 
                variants={itemVariants}
                className="bg-indigo-50 p-6 rounded-xl shadow-md"
              >
                <p className="text-xl font-semibold text-gray-800 mb-4">
                  {currentQuestion.question}
                </p>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => (
                    <motion.label 
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`block p-3 rounded-lg cursor-pointer transition duration-300 
                        ${userAnswers[currentQuestionIndex] === option 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-white hover:bg-indigo-100 border border-indigo-200'}`}
                      onClick={() => handleAnswerChange(currentQuestionIndex, option)}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name={`question-${currentQuestionIndex}`}
                          value={option}
                          checked={userAnswers[currentQuestionIndex] === option}
                          onChange={() => handleAnswerChange(currentQuestionIndex, option)}
                          className="hidden"
                        />
                        <span className="ml-2">{option}</span>
                      </div>
                    </motion.label>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex justify-between items-center"
              >
                <div className="text-lg font-medium text-indigo-700">
                  Time Left: {timeLeft} seconds
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="py-2 px-6 bg-indigo-600 text-white font-bold rounded-xl 
                  shadow-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                >
                  Next <span className="ml-2">→</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default NumericalAbility;