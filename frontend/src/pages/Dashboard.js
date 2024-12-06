import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, CardContent, Typography, Grid, LinearProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import morningImage from '../assets/images/morning.png';
import afternoonImage from '../assets/images/afternoon.png';
import eveningImage from '../assets/images/evening.png';
import nightImage from '../assets/images/night.png';

const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [aptitudeClicked, setAptitudeClicked] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [greetingImage, setGreetingImage] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
      setGreetingImage(morningImage);
    } else if (currentHour < 17) {
      setGreeting('Good Afternoon');
      setGreetingImage(afternoonImage);
    } else if (currentHour < 20) {
      setGreeting('Good Evening');
      setGreetingImage(eveningImage);
    } else {
      setGreeting('Good Night');
      setGreetingImage(nightImage);
    }
  }, []);

  const styles = {
    container: {
      display: 'flex',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
    },
    content: {
      flexGrow: 1,
      padding: '2rem',
      background: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      margin: '2rem',
    },
    card: {
      background: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
    },
    progress: {
      height: '10px',
      borderRadius: '5px',
    },
    cardHeader: {
      backgroundColor: '#4c51bf',
      color: '#ffffff',
      padding: '0.5rem',
      borderRadius: '10px 10px 0 0',
    },
    cardContent: {
      padding: '1rem',
    },
    greetingCard: {
      backgroundColor: '#ffeb3b', // Bright yellow background color
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      padding: '2rem',
      textAlign: 'center',
      height: '100%', // Ensure the height matches the other cards
    },
    greetingText: {
      background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Gradient color
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '2.25rem',
      fontWeight: 'bold',
    },
    resultsCard: {
      display: 'flex',
      alignItems: 'center',
      background: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
    },
    resultsContent: {
      flexGrow: 1,
      padding: '1rem',
    },
    resultsProgress: {
      width: '10px',
      height: '100%',
      borderRadius: '5px',
    },
  };

  const handleAptitudeClick = () => {
    if (!aptitudeClicked) {
      setAptitudeClicked(true);
      // Redirect to /aptitude
      navigate('/preaptitude');
    }
  };

  const handleCareerAnalysisClick = () => {
    navigate('/chatbot');
  };

  const handleMockInterviewClick = () => {
    navigate('/mock-interview');
  };

  const handleResultsClick = () => {
    navigate('/ResultsPage');
  };

  return (
    <div style={styles.container}>
      <Sidebar userName="Aryan Sikariya" />
      <div style={styles.content}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card style={{ ...styles.greetingCard, backgroundImage: `url(${greetingImage})` }}>
              <Typography style={styles.greetingText}>{greeting}, Aryan!</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                {/* <Typography variant="h6">Suitable Job Predictions</Typography> */}
              </div>
              <CardContent style={styles.cardContent}>
                <Box mt={2}>
                  {/* <Typography variant="body2">Software Engineer</Typography> */}
                  {/* <Typography variant="body2" color="textSecondary">70% match</Typography> */}
                </Box>
                <Box mt={2}>
                  {/* <Typography variant="body2">Data Scientist</Typography>
                  <Typography variant="body2" color="textSecondary">65% match</Typography> */}
                </Box>
                <Box mt={2}>
                  {/* <Typography variant="body2">Product Manager</Typography>
                  <Typography variant="body2" color="textSecondary">60% match</Typography> */}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                <Typography variant="h6">Website Features</Typography>
              </div>
              <CardContent style={styles.cardContent}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Card 
                      style={styles.card}
                      onClick={handleAptitudeClick}
                    >
                      <CardContent>
                        <Typography variant="body2">Aptitude Assessment</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card 
                      style={styles.card}
                      onClick={handleCareerAnalysisClick}
                    >
                      <CardContent>
                        <Typography variant="body2">Career Analysis</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card 
                      style={styles.card}
                      onClick={handleMockInterviewClick}
                    >
                      <CardContent>
                        <Typography variant="body2">Mock Interview</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card 
              style={styles.resultsCard}
              onClick={handleResultsClick}
            >
              <LinearProgress variant="determinate" value={70} style={styles.resultsProgress} />
              <div style={styles.resultsContent}>
                <div style={styles.cardHeader}>
                  <Typography variant="h6">Results</Typography>
                </div>
                <CardContent style={styles.cardContent}>
                  <Typography variant="body2">View your test results and progress.</Typography>
                </CardContent>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;