import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const PreSkillGapLandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const handleProfessionalClick = () => {
    navigate('/professional-form', { state: { user, userType: 'Professional' } });
  };

  const handleGraduateClick = () => {
    navigate('/graduate-skill-gap', { state: { user, userType: 'Graduate' } });
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
    },
    card: {
      background: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    cardContent: {
      padding: '2rem',
      textAlign: 'center',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    cardDescription: {
      fontSize: '1rem',
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card style={styles.card} onClick={handleProfessionalClick}>
            <CardContent style={styles.cardContent}>
              <Typography style={styles.cardTitle}>Professional</Typography>
              <Typography style={styles.cardDescription}>
                Take the skill gap test tailored for professionals.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={styles.card} onClick={handleGraduateClick}>
            <CardContent style={styles.cardContent}>
              <Typography style={styles.cardTitle}>Graduate</Typography>
              <Typography style={styles.cardDescription}>
                Take the skill gap test tailored for graduates.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default PreSkillGapLandingPage;