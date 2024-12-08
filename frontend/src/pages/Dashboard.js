import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import morningImage from '../assets/images/morning.png';
import afternoonImage from '../assets/images/afternoon.png';
import eveningImage from '../assets/images/evening.png';
import nightImage from '../assets/images/night.png';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth to get current user
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import dbmockImage from '../assets/images/dbmock.png'; // Add the path to your mock interview image
import dbaptiImage from '../assets/images/dbapti.png'; // Add the path to your aptitude image
import dbcommImage from '../assets/images/dbcomm.png'; // Add the path to your community image
import dbskillImage from '../assets/images/dbskill.png'; // Add the path to your skill gap image
import appLogo from '../assets/images/applogo.png'; // Add the path to your app logo image

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
  const [greetingIcon, setGreetingIcon] = useState(null);
  const [greetingColor, setGreetingColor] = useState('');
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
      setGreetingImage(morningImage);
      setGreetingIcon(<WbSunnyIcon style={styles.greetingIcon} />);
      setGreetingColor('linear-gradient(135deg, #FFDD00 0%, #FBB034 100%)');
    } else if (currentHour < 17) {
      setGreeting('Good Afternoon');
      setGreetingImage(afternoonImage);
      setGreetingIcon(<Brightness5Icon style={styles.greetingIcon} />);
      setGreetingColor('linear-gradient(135deg, #FF8008 0%, #FFC837 100%)');
    } else if (currentHour < 20) {
      setGreeting('Good Evening');
      setGreetingImage(eveningImage);
      setGreetingIcon(<Brightness4Icon style={styles.greetingIcon} />);
      setGreetingColor('linear-gradient(135deg, #667EEA 0%, #764BA2 100%)');
    } else {
      setGreeting('Good Night');
      setGreetingImage(nightImage);
      setGreetingIcon(<NightsStayIcon style={styles.greetingIcon} />);
      setGreetingColor('linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)');
    }

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
    cardContent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      color: 'white',
      background: 'rgba(0, 0, 0, 0.5)', // Add a dark overlay for better text visibility
      borderRadius: '16px',
      padding: '1rem',
    },
    progress: {
      height: '10px',
      borderRadius: '5px',
    },
    cardHeader: {
      background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
      color: '#ffffff',
      padding: '0.5rem',
      borderRadius: '16px 16px 0 0',
    },
    greetingCard: {
      background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: '20px',
      padding: '2.5rem',
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    greetingText: {
      color: 'white',
      fontSize: '2.5rem',
      fontWeight: '700',
      textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
      textAlign: 'center',
      lineHeight: '1.2',
    },
    greetingIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
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
    appName: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#4F46E5',
    },
    featureIcon: {
      fontSize: '2.5rem',
      color: '#4F46E5',
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
      background: `url(${dbskillImage}) no-repeat center center`,
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
    navigate('/mock-interview');
  };

  const handleResultsClick = () => {
    navigate('/ResultsPage');
  };

  const handleSkillGapTestClick = () => {
    const userDetails = user ? { displayName: user.displayName, email: user.email, uid: user.uid } : null;
    navigate('/pre-skill-gap', { state: { user: userDetails } });
  };

  return (
    <div style={styles.container}>
      <Sidebar userName={userName} />
      <div style={styles.content}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#1F2937' }}>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Tilt options={{ max: 25, scale: 1.05 }}>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card style={{ ...styles.greetingCard, background: greetingColor }}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    {greetingIcon}
                    <Typography style={styles.greetingText}>
                      {greeting}, {userName}!
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            </Tilt>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.appCard}>
                <div style={styles.appCardContent}>
                  <img src={appLogo} alt="App Logo" style={styles.appLogo} />
                  <Typography style={styles.appName}>App Name</Typography>
                </div>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.aptitudeCard} onClick={handleAptitudeClick}>
                <div style={styles.cardContent}>
                  <AssessmentIcon style={styles.featureIcon} />
                  <Typography variant="body2">Career Counselling</Typography>
                </div>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.communityCard} onClick={handleCareerAnalysisClick}>
                <div style={styles.cardContent}>
                  <WorkIcon style={styles.featureIcon} />
                  <Typography variant="body2">Community Forum</Typography>
                </div>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.mockInterviewCard} onClick={handleMockInterviewClick}>
                <div style={styles.cardContent}>
                  <PersonIcon style={styles.featureIcon} />
                  <Typography variant="body2">Mock Interview</Typography>
                </div>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card style={styles.skillGapCard} onClick={handleSkillGapTestClick}>
                <div style={styles.cardContent}>
                  <SchoolIcon style={styles.featureIcon} />
                  <Typography variant="body2">Skill Gap Test</Typography>
                </div>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;