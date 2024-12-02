import React from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, CardContent, Typography, Grid, LinearProgress, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const Dashboard = () => {
  const styles = {
    container: {
      display: 'flex',
    },
    sidebar: {
      position: 'fixed',
      height: '100vh',
      width: '250px',
      backgroundColor: '#4c51bf',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    },
    content: {
      marginLeft: '250px', // Adjust to the width of the sidebar
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      margin: '2rem',
      flexGrow: 1,
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <Sidebar userName="Aryan Sikariya" />
      </div>
      <div style={styles.content}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6">Progress</Typography>
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
              <CardContent>
                <Typography variant="h6">Suitable Job Predictions</Typography>
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
              <CardContent>
                <Typography variant="h6">Website Features</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Card style={styles.card}>
                      <CardContent>
                        <Typography variant="body2">Aptitude Assesment</Typography>
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
              <CardContent>
                <Typography variant="h6">Performance Overview</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;