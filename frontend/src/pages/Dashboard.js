import React from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, CardContent, Typography, Grid, LinearProgress, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', timeSpent: 30 },
  { name: 'Feb', timeSpent: 45 },
  { name: 'Mar', timeSpent: 50 },
  { name: 'Apr', timeSpent: 40 },
  { name: 'May', timeSpent: 60 },
  { name: 'Jun', timeSpent: 70 },
  { name: 'Jul', timeSpent: 80 },
];

const streaksData = [
  { date: '2023-10-01', active: true },
  { date: '2023-10-02', active: false },
  { date: '2023-10-03', active: true },
  { date: '2023-10-04', active: true },
  { date: '2023-10-05', active: false },
  { date: '2023-10-06', active: true },
  { date: '2023-10-07', active: true },
  { date: '2023-10-08', active: false },
  { date: '2023-10-09', active: true },
  { date: '2023-10-10', active: true },
  { date: '2023-10-11', active: false },
  { date: '2023-10-12', active: true },
  { date: '2023-10-13', active: true },
  { date: '2023-10-14', active: false },
  { date: '2023-10-15', active: true },
  { date: '2023-10-16', active: true },
  { date: '2023-10-17', active: false },
  { date: '2023-10-18', active: true },
  { date: '2023-10-19', active: true },
  { date: '2023-10-20', active: false },
  { date: '2023-10-21', active: true },
  { date: '2023-10-22', active: true },
  { date: '2023-10-23', active: false },
  { date: '2023-10-24', active: true },
  { date: '2023-10-25', active: true },
  { date: '2023-10-26', active: false },
  { date: '2023-10-27', active: true },
  { date: '2023-10-28', active: true },
  { date: '2023-10-29', active: false },
  { date: '2023-10-30', active: true },
  { date: '2023-10-31', active: true },
];

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
    streaksContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '5px',
      marginTop: '2rem',
    },
    streakDay: {
      width: '30px',
      height: '30px',
      borderRadius: '5px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    activeDay: {
      backgroundColor: '#4c51bf',
    },
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  return (
    <div style={styles.container}>
      <Sidebar userName="Aryan Sikariya" />
      <div style={styles.content}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                <Typography variant="h6">Progress</Typography>
              </div>
              <CardContent style={styles.cardContent}>
                <Box mt={2}>
                  <Typography variant="body2">Course Completion</Typography>
                  <LinearProgress variant="determinate" value={70} style={styles.progress} />
                </Box>
                <Box mt={2}>
                  <Typography variant="body2">Skill Development</Typography>
                  <LinearProgress variant="determinate" value={50} style={styles.progress} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                <Typography variant="h6">Suitable Job Predictions</Typography>
              </div>
              <CardContent style={styles.cardContent}>
                <Box mt={2}>
                  <Typography variant="body2">Software Engineer</Typography>
                  <Typography variant="body2" color="textSecondary">70% match</Typography>
                </Box>
                <Box mt={2}>
                  <Typography variant="body2">Data Scientist</Typography>
                  <Typography variant="body2" color="textSecondary">65% match</Typography>
                </Box>
                <Box mt={2}>
                  <Typography variant="body2">Product Manager</Typography>
                  <Typography variant="body2" color="textSecondary">60% match</Typography>
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
                    <Card style={styles.card}>
                      <CardContent>
                        <Typography variant="body2">Aptitude Assessment</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card style={styles.card}>
                      <CardContent>
                        <Typography variant="body2">Feature 2</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card style={styles.card}>
                      <CardContent>
                        <Typography variant="body2">Feature 3</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                <Typography variant="h6">Time Spent on Website</Typography>
              </div>
              <CardContent style={styles.cardContent}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="timeSpent" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                <Typography variant="h6">Streaks</Typography>
              </div>
              <CardContent style={styles.cardContent}>
                <Box style={styles.streaksContainer}>
                  {daysInMonth.map((day, index) => {
                    const isActive = streaksData.some(streak => new Date(streak.date).toDateString() === day.toDateString() && streak.active);
                    return (
                      <Box
                        key={index}
                        style={{
                          ...styles.streakDay,
                          ...(isActive ? styles.activeDay : {}),
                        }}
                      >
                        {day.getDate()}
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;