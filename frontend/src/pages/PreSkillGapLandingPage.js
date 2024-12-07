import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';

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
      backgroundColor: '#f0f4f8',
      padding: '2rem',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      margin: '1rem',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      backgroundColor: '#ffffff',
      textAlign: 'center',
    },
    arrowButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1rem',
    },
  };

  return (
    <Box style={styles.container}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Professional
              </Typography>
              <Typography variant="body1">
                Click here if you are a professional looking to assess your skill gaps.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={styles.arrowButton}
                onClick={handleProfessionalClick}
                endIcon={<ArrowForward />}
              >
                Professional
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Graduate
              </Typography>
              <Typography variant="body1">
                Click here if you are a graduate looking to assess your skill gaps.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                style={styles.arrowButton}
                onClick={handleGraduateClick}
                endIcon={<ArrowBack />}
              >
                Graduate
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PreSkillGapLandingPage;