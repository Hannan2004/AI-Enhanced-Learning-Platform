import React from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import { Card, CardContent, Typography, Box } from '@mui/material';
import CareerOpeepsImage from '../assets/images/CareerOpeeps.png'; // Import the image

const careerOptions = [
  {
    title: 'Software Engineer',
    description: 'As a Software Engineer, you will develop and maintain software applications, work on various programming languages, and collaborate with cross-functional teams to deliver high-quality software solutions.',
    matchPercentage: 90,
  },
  {
    title: 'Data Scientist',
    description: 'As a Data Scientist, you will analyze and interpret complex data to help organizations make informed decisions. You will use statistical techniques, machine learning, and data visualization tools.',
    matchPercentage: 85,
  },
  {
    title: 'Product Manager',
    description: 'As a Product Manager, you will oversee the development and launch of products. You will work closely with engineering, design, and marketing teams to ensure the product meets customer needs and business goals.',
    matchPercentage: 80,
  },
  {
    title: 'UX/UI Designer',
    description: 'As a UX/UI Designer, you will create user-friendly interfaces and enhance user experiences. You will work on wireframes, prototypes, and collaborate with developers to implement your designs.',
    matchPercentage: 75,
  },
];

const CareerOptions = () => {
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
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: '1fr 1fr 1fr',
      gap: '1rem',
      justifyItems: 'center',
      alignItems: 'center',
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
    matchPercentage: {
      marginTop: '1rem',
      fontWeight: 'bold',
      color: '#4c51bf',
    },
    image: {
      width: '100%',
      borderRadius: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar userName="Aryan Sikariya" />
      <div style={styles.content}>
        <Box gridColumn="2 / span 1" gridRow="2 / span 1">
          <img src={CareerOpeepsImage} alt="Career Options" style={styles.image} />
        </Box>
        <Box gridColumn="2 / span 1" gridRow="1 / span 1">
          <Card style={styles.card}>
            <div style={styles.cardHeader}>
              <Typography variant="h6">{careerOptions[0].title}</Typography>
            </div>
            <CardContent style={styles.cardContent}>
              <Typography variant="body2">{careerOptions[0].description}</Typography>
              <Typography variant="body2" style={styles.matchPercentage}>
                Match Percentage: {careerOptions[0].matchPercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box gridColumn="1 / span 1" gridRow="2 / span 1">
          <Card style={styles.card}>
            <div style={styles.cardHeader}>
              <Typography variant="h6">{careerOptions[1].title}</Typography>
            </div>
            <CardContent style={styles.cardContent}>
              <Typography variant="body2">{careerOptions[1].description}</Typography>
              <Typography variant="body2" style={styles.matchPercentage}>
                Match Percentage: {careerOptions[1].matchPercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box gridColumn="3 / span 1" gridRow="2 / span 1">
          <Card style={styles.card}>
            <div style={styles.cardHeader}>
              <Typography variant="h6">{careerOptions[2].title}</Typography>
            </div>
            <CardContent style={styles.cardContent}>
              <Typography variant="body2">{careerOptions[2].description}</Typography>
              <Typography variant="body2" style={styles.matchPercentage}>
                Match Percentage: {careerOptions[2].matchPercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box gridColumn="2 / span 1" gridRow="3 / span 1">
          <Card style={styles.card}>
            <div style={styles.cardHeader}>
              <Typography variant="h6">{careerOptions[3].title}</Typography>
            </div>
            <CardContent style={styles.cardContent}>
              <Typography variant="body2">{careerOptions[3].description}</Typography>
              <Typography variant="body2" style={styles.matchPercentage}>
                Match Percentage: {careerOptions[3].matchPercentage}%
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default CareerOptions;