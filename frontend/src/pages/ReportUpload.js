import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary

const FlipCard = styled.div`
  background-color: transparent;
  width: 100%;
  height: 200px;
  perspective: 1000px;
  margin-bottom: 20px;
`;

const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;

  ${FlipCard}:hover & {
    transform: rotateY(180deg);
  }
`;

const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

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
      const response = await axios.post('http://localhost:3001/generateRecommendations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      width: '100%',
      maxWidth: '600px',
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
    flipCardContainer: {
      marginTop: '2rem',
      width: '100%',
      maxWidth: '800px',
    },
  };

  return (
    <div style={styles.container}>
      <Sidebar userName="Aryan Sikariya" />
      <div style={styles.content}>
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
        <div style={styles.flipCardContainer}>
          {recommendations.map((rec, index) => (
            <FlipCard key={index}>
              <FlipCardInner>
                <FlipCardFront className="bg-blue-500 text-white p-4 rounded-lg">
                  <Typography variant="h6">{rec.career}</Typography>
                </FlipCardFront>
                <FlipCardBack className="bg-gray-100 text-black p-4 rounded-lg">
                  <Typography variant="body2">{rec.reason}</Typography>
                </FlipCardBack>
              </FlipCardInner>
            </FlipCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportUpload;