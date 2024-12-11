import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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

const NumericalAbility = ({ setScores }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 30 minutes
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = useParams();
  const { user, language, scores } = location.state;

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
      else handleSubmit();
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchQuestions = async () => {
    try {
      console.log('Fetching questions for type:', userType, 'and language:', language);
      const response = await axios.post('http://localhost:3001/generateNumerical', { type: userType, language });
      console.log('Questions fetched:', response.data.response);
      setQuestions(JSON.parse(response.data.response));
    } catch (error) {
      console.error('Error fetching questions:', error);
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [userType, language]);

  const handleAnswerChange = (index, answer) => {
    setUserAnswers({ ...userAnswers, [index]: answer });
  };

  const markForReview = (index) => {
    setMarkedQuestions({ ...markedQuestions, [index]: !markedQuestions[index] });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/assessNumerical', {
        userAnswers,
        questions,
      });
      const { score } = response.data;
      const updatedScores = { ...scores, numerical: score };
      setScores(updatedScores);

      // Navigate to verbal ability page with user details and scores
      navigate('/verbal-ability', { state: { user, scores: updatedScores, language, userType } });
    } catch (error) {
      console.error('Error assessing answers:', error);
    }
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
                onClick={() => document.getElementById(`question-${i}`).scrollIntoView({ behavior: 'smooth' })}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box flex={1} p={4}>
        <Typography variant="h5">Psychometric Test</Typography>
        <Typography>Time Remaining: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s</Typography>
        <LinearProgress variant="determinate" value={(timeLeft / 300) * 100} />
        {questions.length > 0 && (
          <Box>
            {questions.map((question, index) => (
              <Card key={index} id={`question-${index}`} style={{ marginBottom: '20px' }}>
                <CardContent>
                  <Typography>Question {index + 1}: {question.question}</Typography>
                  <RadioGroup value={userAnswers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)}>
                    {question.options.map((opt, idx) => (
                      <FormControlLabel key={idx} value={opt} control={<Radio />} label={opt} />
                    ))}
                  </RadioGroup>
                </CardContent>
                <Box display="flex" justifyContent="space-between" p={2}>
                  <Button onClick={() => markForReview(index)} color="warning">{markedQuestions[index] ? 'Unmark' : 'Mark'}</Button>
                </Box>
              </Card>
            ))}
            <Box display="flex" justifyContent="center" p={2}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NumericalAbility;