import React from 'react';
import Header from '../components/Navbar.js'; // Correct the Header component path
import Footer from '../components/Footer.js'; // Correct the Footer component path
import CareerCounsellingImage from '../assets/images/cc.png'; // Correct the image path
import SkillGapImage from '../assets/images/skillgap.png'; // Correct the image path
import MockInterviewImage from '../assets/images/mockinterview.png'; // Correct the image path
import ConnectionsImage from '../assets/images/connections.png'; // Correct the image path
import RoadmapBgImage from '../assets/images/roadmapbg.png'; // Correct the image path

const RoadMap = () => {
  const styles = {
    container: {
      background: 'linear-gradient(to right, #ebf8ff, #c3dafe)',
      color: '#2d3748',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
    },
    roadmapContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      borderRadius: '0.5rem',
      padding: '2rem',
      width: '90%',
      maxWidth: '1200px',
      textAlign: 'center',
      backgroundImage: `url(${RoadmapBgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    stepsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      flexWrap: 'wrap',
    },
    step: {
      flex: '1',
      margin: '1rem',
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
      minWidth: '250px',
    },
    stepHover: {
      transform: 'scale(1.05)',
    },
    stepTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#4a5568',
    },
    stepDescription: {
      fontSize: '1rem',
      color: '#4a5568',
    },
    image: {
      width: '100%',
      height: 'auto',
      marginBottom: '1rem',
    },
    line: {
      position: 'absolute',
      height: '4px',
      backgroundColor: '#4c51bf',
      top: '50%',
      left: 0,
      right: 0,
      transform: 'translateY(-50%)',
      zIndex: 0,
    },
    '@media (max-width: 768px)': {
      stepsContainer: {
        flexDirection: 'column',
      },
      step: {
        margin: '1rem 0',
      },
      line: {
        display: 'none',
      },
    },
  };

  return (
    <div style={styles.container}>
      <Header /> {/* Use the Header component */}
      <div style={styles.mainContent}>
        <div style={styles.roadmapContainer}>
          <h2 style={styles.stepTitle}>Roadmap</h2>
          <div style={styles.stepsContainer}>
            <div style={styles.line}></div>
            <div
              style={styles.step}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={() => window.location.href = '#career-counselling'}
            >
              <img src={CareerCounsellingImage} alt="Career Counselling" style={styles.image} />
              <h3 style={styles.stepTitle}>Career Counselling</h3>
              <p style={styles.stepDescription}>
                Get personalized career advice and guidance from experts.
              </p>
            </div>
            <div
              style={styles.step}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={() => window.location.href = '#skill-gap-analysis'}
            >
              <img src={SkillGapImage} alt="Skill Gap Analysis" style={styles.image} />
              <h3 style={styles.stepTitle}>Skill Gap Analysis</h3>
              <p style={styles.stepDescription}>
                Identify skill gaps and recommend learning resources.
              </p>
            </div>
            <div
              style={styles.step}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={() => window.location.href = '#mock-interview'}
            >
              <img src={MockInterviewImage} alt="Mock Interview" style={styles.image} />
              <h3 style={styles.stepTitle}>Mock Interview</h3>
              <p style={styles.stepDescription}>
                Prepare for your interviews with our mock interview sessions.
              </p>
            </div>
            <div
              style={styles.step}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={() => window.location.href = '#connecting-with-industry'}
            >
              <img src={ConnectionsImage} alt="Connecting with Industry" style={styles.image} />
              <h3 style={styles.stepTitle}>Connections</h3>
              <p style={styles.stepDescription}>
                Network with industry professionals and explore job opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Use the Footer component */}
    </div>
  );
};

export default RoadMap;