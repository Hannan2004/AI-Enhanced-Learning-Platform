import React from 'react';
import Header from '../components/Navbar'; // Corrected the Header component path
import Footer from '../components/Footer'; // Corrected the Footer component path
import CareerCounsellingImage from '../assets/images/cc.png'; // Corrected the image path
import SkillGapImage from '../assets/images/skillgap.png'; // Corrected the image path
import MockInterviewImage from '../assets/images/mockinterview.png'; // Corrected the image path
import ConnectionsImage from '../assets/images/connections.png'; // Corrected the image path
import RoadmapBgImage from '../assets/images/roadmapbg.png'; // Corrected the image path

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
  };

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.mainContent}>
        <h1>RoadMap</h1>
        <img src={CareerCounsellingImage} alt="Career Counselling" />
        <img src={SkillGapImage} alt="Skill Gap" />
        <img src={MockInterviewImage} alt="Mock Interview" />
        <img src={ConnectionsImage} alt="Connections" />
        <img src={RoadmapBgImage} alt="Roadmap Background" />
      </main>
      <Footer />
    </div>
  );
};

export default RoadMap;