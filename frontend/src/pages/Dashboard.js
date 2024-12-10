import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth to get current user
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import dbmockImage from '../assets/images/mobutton.png'; // Add the path to your mock interview image
import dbaptiImage from '../assets/images/aptibut.png'; // Add the path to your aptitude image
import dbcommImage from '../assets/images/cummbutton.png'; // Add the path to your community image
import skillButtonImage from '../assets/images/skillbutton.png'; // Add the path to your skill button image
import appLogo from '../assets/images/applogo.png'; // Add the path to your app logo image
import ChatBot from '../components/Chatbot';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

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
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('Guest');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Add state for sidebar collapsed

  useEffect(() => {
    // Fetch the currently logged-in user's details from Firebase Authentication
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchUserName(currentUser.uid);
    }
  }, []);

  const fetchUserName = async (uid) => {
    const db = getFirestore();
    const userDoc = doc(db, 'users', uid);
    const userSnap = await getDoc(userDoc);
    if (userSnap.exists()) {
      setUserName(userSnap.data().displayName);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
      minHeight: '100vh',
    },
    content: {
      flexGrow: 1,
      padding: '2.5rem',
      margin: '2rem',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      transition: 'margin-left 0.3s ease-in-out', // Add transition for smooth sidebar collapse
      marginLeft: isSidebarCollapsed ? '80px' : '250px', // Adjust margin based on sidebar state
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 48px rgba(59, 130, 246, 0.15)',
      },
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
    },
    appCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 48px rgba(59, 130, 246, 0.15)',
      },
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
    },
    appCardContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
    },
    appLogo: {
      width: '50%',
      height: 'auto',
      marginBottom: '1rem',
    },
    mockInterviewCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `url(${dbmockImage}) no-repeat center center`,
      backgroundSize: 'cover',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 48px rgba(59, 130, 246, 0.15)',
      },
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
    },
    aptitudeCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `url(${dbaptiImage}) no-repeat center center`,
      backgroundSize: 'cover',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 48px rgba(59, 130, 246, 0.15)',
      },
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
    },
    communityCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `url(${dbcommImage}) no-repeat center center`,
      backgroundSize: 'cover',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 48px rgba(59, 130, 246, 0.15)',
      },
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
    },
    skillGapCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `url(${skillButtonImage}) no-repeat center center`,
      backgroundSize: 'cover',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem',
      cursor: 'pointer',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 12px 48px rgba(59, 130, 246, 0.15)',
      },
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
    },
    infoText: {
      textAlign: 'center',
      color: '#1F2937',
      marginTop: '1rem',
    },
  };

  const handleAptitudeClick = () => {
    if (!aptitudeClicked) {
      setAptitudeClicked(true);
      // Pass only necessary user details to avoid cloning issues
      const userDetails = user ? { displayName: user.displayName, email: user.email, uid: user.uid } : null;
      // Redirect to /preaptitude with user details
      navigate('/preaptitude', { state: { user: userDetails } });
    }
  };

  const handleCareerAnalysisClick = () => {
    navigate('/community');
  };

  const handleMockInterviewClick = () => {
    navigate('/interview-landing');
  };

  const handleResultsClick = () => {
    navigate('/ResultsPage');
  };

  const handleSkillGapTestClick = () => {
    const userDetails = user ? { displayName: user.displayName, email: user.email, uid: user.uid } : null;
    navigate('/pre-skill-gap', { state: { user: userDetails } });
  };

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Verbal Ability',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Logical Ability',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Numerical Ability',
        data: [18, 48, 77, 9, 100, 27, 40],
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <Sidebar userName={userName} isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <div style={styles.content}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#1F2937' }}>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.appCard}>
                <div style={styles.appCardContent}>
                  <img src={appLogo} alt="App Logo" style={styles.appLogo} />
                </div>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={styles.infoContainer}>
              <Typography variant="h5" style={styles.infoText}>
                Welcome to Our App!
              </Typography>
              <Typography variant="body1" style={styles.infoText}>
                Our app provides a comprehensive platform for aptitude tests, mock interviews, and career analysis.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.aptitudeCard} onClick={handleAptitudeClick} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.communityCard} onClick={handleCareerAnalysisClick} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.mockInterviewCard} onClick={handleMockInterviewClick} />
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.skillGapCard} onClick={handleSkillGapTestClick} />
            </motion.div>
          </Grid>
        </Grid>
        <div style={{ marginTop: '2rem' }}>
          <Line data={chartData} />
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default Dashboard;