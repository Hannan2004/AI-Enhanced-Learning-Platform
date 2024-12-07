import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import CareerOpeepsImage from '../assets/images/CareerOpeeps.png'; // Import the image

const ReportUpload = () => {
  const [file, setFile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('report', file);

    try {
      const response = await axios.post(
        'http://localhost:3001/generateRecommendations',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setRecommendations(response.data.career_recommendations);
    } catch (error) {
      console.error('Error uploading report:', error);
    }
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
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gridTemplateRows: 'auto auto',
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
    button: {
      marginTop: '1rem',
      backgroundColor: '#4c51bf',
      color: '#ffffff',
    },
    image: {
      width: '100%',
      borderRadius: '10px',
    },
    matchPercentage: {
      marginTop: '1rem',
      fontWeight: 'bold',
      color: '#4c51bf',
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar userName="Aryan Sikariya" />
      <div style={styles.content}>
        <Box gridColumn="1 / span 3" gridRow="1 / span 1">
          <img src={CareerOpeepsImage} alt="Career Options" style={styles.image} />
        </Box>
        <Box gridColumn="1 / span 3" gridRow="2 / span 1">
          <Card style={styles.card}>
            <div style={styles.cardHeader}>
              <Typography variant="h6">Upload Your Report</Typography>
            </div>
            <CardContent style={styles.cardContent}>
              <form onSubmit={handleSubmit}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <Button type="submit" variant="contained" style={styles.button}>
                  Upload
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
        {recommendations.map((rec, index) => (
          <Box key={index} gridColumn="span 1" gridRow="span 1">
            <Link to={`/career-roadmap/${rec.career}`} style={{ textDecoration: 'none' }}>
              <Card style={styles.card}>
                <div style={styles.cardHeader}>
                  <Typography variant="h6">{rec.career}</Typography>
                </div>
                <CardContent style={styles.cardContent}>
                  <Typography variant="body2">{rec.reason}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default ReportUpload;
