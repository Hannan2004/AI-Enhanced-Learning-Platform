import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, CardContent, Typography, Grid, Box, Button, TextField, Paper, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SkillGap = () => {
  const [currentSkills, setCurrentSkills] = useState('JavaScript, React, Node.js');
  const [predictedJob, setPredictedJob] = useState('Full Stack Developer');
  const [isEditable, setIsEditable] = useState(false);
  const [showSkillGaps, setShowSkillGaps] = useState(false);
  const [loading, setLoading] = useState(false);

  const missingSkills = ['TypeScript', 'GraphQL', 'Docker', 'Kubernetes'];
  const skillGapData = [
    { skill: 'TypeScript', level: 70 },
    { skill: 'GraphQL', level: 60 },
    { skill: 'Docker', level: 50 },
    { skill: 'Kubernetes', level: 40 },
  ];

  const handleEdit = () => {
    setIsEditable(!isEditable);
    if (!isEditable) {
      setShowSkillGaps(false);
    }
  };

  const handlePredictSkillGaps = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSkillGaps(true);
    }, 2000); // Simulate a delay for fetching data
  };

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
      padding: '1rem',
      width: '100%',
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
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1rem',
    },
    missingSkillsContainer: {
      marginTop: '2rem',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    },
    missingSkillsList: {
      listStyleType: 'none',
      padding: 0,
    },
    missingSkillItem: {
      marginBottom: '0.5rem',
    },
    skillGapContainer: {
      marginTop: '2rem',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar userName="Aryan Sikariya" />
      <div style={styles.content}>
        <Typography variant="h4" gutterBottom>
          Skill Gap Analysis
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                <Typography variant="h6">Current Skills</Typography>
              </div>
              <CardContent style={styles.cardContent}>
                {isEditable ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={currentSkills}
                    onChange={(e) => setCurrentSkills(e.target.value)}
                  />
                ) : (
                  <Typography variant="body2">{currentSkills}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                <Typography variant="h6">Predicted Job</Typography>
              </div>
              <CardContent style={styles.cardContent}>
                {isEditable ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={predictedJob}
                    onChange={(e) => setPredictedJob(e.target.value)}
                  />
                ) : (
                  <Typography variant="body2">{predictedJob}</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div style={styles.buttonContainer}>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            {isEditable ? 'Save' : 'Edit'}
          </Button>
          <Button variant="contained" color="secondary" onClick={handlePredictSkillGaps} disabled={isEditable}>
            Predict Skill Gaps
          </Button>
        </div>
        {loading && (
          <div style={styles.loadingContainer}>
            <CircularProgress />
          </div>
        )}
        {!loading && showSkillGaps && (
          <>
            <Paper style={styles.missingSkillsContainer}>
              <Typography variant="h5" gutterBottom>
                Missing Skills
              </Typography>
              <ul style={styles.missingSkillsList}>
                {missingSkills.map((skill, index) => (
                  <li key={index} style={styles.missingSkillItem}>
                    <Typography variant="body2">{skill}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
            <Paper style={styles.skillGapContainer}>
              <Typography variant="h5" gutterBottom>
                Skill Gap Analysis
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillGapData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="level" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </>
        )}
      </div>
    </div>
  );
};

export default SkillGap;