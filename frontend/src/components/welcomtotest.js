import React from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

const WelcomePage = () => {
  const styles = {
    container: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      margin: '2rem',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
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
  };

  return (
    <div style={styles.container}>
      <Sidebar userName="Aryan Sikariya" />
      <div style={styles.content}>
        <Typography variant="h4" gutterBottom>
          Welcome to Aptitude Test
        </Typography>
        <Card style={styles.card}>
          <div style={styles.cardHeader}>
            <Typography variant="h6">Test Rules</Typography>
          </div>
          <CardContent style={styles.cardContent}>
            <Typography variant="body1" gutterBottom>
              The test will have 4 sections:
            </Typography>
            <ul>
              <li>Verbal</li>
              <li>Numerical</li>
              <li>Logical</li>
              <li>Spatial</li>
            </ul>
            <Typography variant="body1" gutterBottom>
              Each section will have 5 questions and you will have 1 minute for each question.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WelcomePage;