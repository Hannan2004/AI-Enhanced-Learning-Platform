import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import CareerOpeepsImage from '../assets/images/CareerOpeeps.png';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const ReportUpload = () => {
  const [file, setFile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [roadmap, setRoadmap] = useState('');
  const navigate = useNavigate();

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
      alert('Error generating recommendations. Please try again.');
    }
  };

  const handlePursueCareer = async (rec) => {
    try {
      if (rec.role === '10th grade student') {
        const response = await axios.post('http://localhost:3001/generate-roadmap-student', {
          career: rec.career,
          role: rec.role,
          reason: rec.reason
        });

        // Ensure we have roadmap data
        if (!response.data || !response.data.roadmap) {
          throw new Error('No roadmap data received');
        }

        setRoadmap(response.data.roadmap);
      } else if (rec.role === 'Graduate' || rec.role === 'Undergraduate') {
        const response = await axios.post('http://localhost:3001/generate-roadmap-graduate', {
          career: rec.career
        });
        
        // Ensure the roadmap is properly formatted
        const roadmapData = response.data.roadmap;
        let parsedRoadmap;
        
        try {
          // If it's a string (possibly with markdown), clean and parse it
          if (typeof roadmapData === 'string') {
            const cleanJson = roadmapData.replace(/```json\n|\n```/g, '');
            parsedRoadmap = JSON.parse(cleanJson);
          } else {
            parsedRoadmap = roadmapData;
          }
          
          navigate('/report-graduate', { 
            state: { 
              recommendation: rec,
              roadmap: parsedRoadmap
            }
          });
        } catch (error) {
          console.error('Error parsing roadmap data:', error);
          alert('Error processing roadmap data. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error generating roadmap:', error);
      alert('Error generating roadmap. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar userName="User" />
      <div style={styles.content}>
        <Box gridColumn="1 / span 3">
          <img src={CareerOpeepsImage} alt="Career Options" style={styles.image} />
        </Box>
        <Box gridColumn="1 / span 3">
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
          <Box key={index}>
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                <Typography variant="h6">{rec.career}</Typography>
              </div>
              <CardContent style={styles.cardContent}>
                <Typography variant="body2">{rec.reason}</Typography>
                <Button
                  variant="contained"
                  style={styles.button}
                  onClick={() => handlePursueCareer(rec)}
                >
                  I want to pursue this career
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
        {roadmap && (
          <Box gridColumn="1 / span 3">
            <Card style={styles.card}>
              <div style={styles.cardHeader}>
                <Typography variant="h6">Career Roadmap</Typography>
              </div>
              <CardContent style={styles.cardContent}>
                <ReactMarkdown>{roadmap}</ReactMarkdown>
              </CardContent>
            </Card>
          </Box>
        )}
      </div>
    </div>
  );
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
  button: {
    marginTop: '1rem',
    backgroundColor: '#4c51bf',
    color: '#ffffff',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
  },
};

export default ReportUpload;