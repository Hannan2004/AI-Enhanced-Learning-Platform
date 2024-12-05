import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  LinearProgress,
  Grid,
  Chip,
} from '@mui/material';

const VerbalAbility = ({ setScores }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes for the test
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
      else handleSubmit();
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generateVerbal', { type: 'verbal-ability' });
      setQuestions(JSON.parse(response.data.response));
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerChange = (index, answer) => {
    setUserAnswers({ ...userAnswers, [index]: answer });
  };

  const markForReview = (index) => {
    setMarkedQuestions({ ...markedQuestions, [index]: !markedQuestions[index] });
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.correctAnswer) score++;
    });
    setScores((prev) => ({ ...prev, verbal: score }));
    navigate('/logical-reasoning');  // Navigate to Logical Reasoning after submission
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Box width="20%" bgcolor="primary.light" p={2}>
        <Typography variant="h6">Question Navigation</Typography>
        <Grid container spacing={1}>
          {questions.map((_, i) => (
            <Grid item xs={4} key={i}>
              <Chip
                label={i + 1}
                color={userAnswers[i] ? 'success' : markedQuestions[i] ? 'warning' : 'default'}
                onClick={() => setCurrentQuestionIndex(i)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box flex={1} p={4}>
        <Typography variant="h5">Verbal Ability Test</Typography>
        <Typography>Time Remaining: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s</Typography>
        <LinearProgress variant="determinate" value={(timeLeft / 1800) * 100} />
        {questions.length > 0 && (
          <Card>
            <CardContent>
              <Typography>Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}</Typography>
              <RadioGroup value={userAnswers[currentQuestionIndex] || ''} onChange={(e) => handleAnswerChange(currentQuestionIndex, e.target.value)}>
                {questions[currentQuestionIndex].options.map((opt, idx) => (
                  <FormControlLabel key={idx} value={opt} control={<Radio />} label={opt} />
                ))}
              </RadioGroup>
            </CardContent>
            <Box display="flex" justifyContent="space-between" p={2}>
              <Button onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))} disabled={currentQuestionIndex === 0}>Previous</Button>
              <Button onClick={() => markForReview(currentQuestionIndex)} color="warning">{markedQuestions[currentQuestionIndex] ? 'Unmark' : 'Mark'}</Button>
              <Button onClick={() => currentQuestionIndex < questions.length - 1 ? setCurrentQuestionIndex((prev) => prev + 1) : handleSubmit()}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}</Button>
            </Box>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default VerbalAbility;
