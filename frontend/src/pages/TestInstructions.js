import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
// import Logo from './path-to-your-logo.svg'; // Replace with your app's logo path

const TestInstructions = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/preaptitude');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
      }}
    >
      <div style={{ maxWidth: '900px', width: '100%', padding: '20px' }}>
        <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
          <Grid container>
            {/* Left Section - App Logo */}
            <Grid
              item
              xs={4}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e0e7ff',
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
              }}
            >
              {/* <img src={Logo} alt="App Logo" style={{ maxWidth: '80%', maxHeight: '80%' }} /> */}
            </Grid>

            {/* Right Section - Instructions */}
            <Grid item xs={8}>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ textAlign: 'center', marginBottom: '20px' }}
                >
                  Test Instructions
                </Typography>
                <Typography variant="body1" gutterBottom style={{ marginBottom: '10px' }}>
                  Welcome to the test! You will have <strong>30 minutes</strong> to complete the entire assessment.
                </Typography>
                <Typography variant="body1" gutterBottom style={{ marginBottom: '10px' }}>
                  The test will consist of <strong>three sections</strong> evaluating:
                  <ul>
                    <li>1.Numerical Ability</li>
                    <li>2.Verbal Ability</li>
                    <li>3.Logical Reasoning</li>
                  </ul>
                </Typography>
                <Typography variant="body1">
                  Please ensure you are in a quiet environment and have a stable internet connection.
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '5px',
            }}
          >
            Click here to begin your test
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default TestInstructions;
