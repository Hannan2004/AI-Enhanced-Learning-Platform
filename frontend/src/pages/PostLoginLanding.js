import React from 'react';
import Header from '../components/Navbar.js'; // Correct the Header component path
import Footer from '../components/Footer.js'; // Correct the Footer component path
import StudentImage from '../assets/images/stu.png'; // Correct the image path
import UndergradImage from '../assets/images/underg.png'; // Correct the image path
import ProfessionalImage from '../assets/images/workingp.png'; // Correct the image path

const PostLoginLanding = () => {
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
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
    },
    cardContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
      gap: '20px',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      borderRadius: '0.5rem',
      padding: '2rem',
      textAlign: 'center',
      flex: '1 1 30%',
      transition: 'transform 0.3s ease',
      height: '500px', // Adjust height for deeper rectangular shape
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    cardHover: {
      transform: 'scale(1.1)',
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#4a5568',
    },
    cardDescription: {
      fontSize: '1rem',
      color: '#4a5568',
      marginBottom: '1rem',
    },
    button: {
      backgroundColor: '#4c51bf',
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      border: 'none',
      fontSize: '1rem',
    },
    image: {
      width: '100%',
      height: 'auto',
      marginBottom: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <Header /> {/* Use the Header component */}
      <div style={styles.mainContent}>
        <div style={styles.cardContainer}>
          <div
            style={styles.card}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={styles.cardContent}>
              <img src={StudentImage} alt="Student" style={styles.image} />
              <h3 style={styles.cardTitle}>Student</h3>
              <p style={styles.cardDescription}>
                Explore career options and get guidance on choosing the right path for your future.
              </p>
              <button style={styles.button}>Fill Form</button>
            </div>
          </div>
          <div
            style={styles.card}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={styles.cardContent}>
              <img src={UndergradImage} alt="Undergraduate" style={styles.image} />
              <h3 style={styles.cardTitle}>Undergraduate</h3>
              <p style={styles.cardDescription}>
                Identify your strengths and get personalized recommendations to enhance your career prospects.
              </p>
              <button style={styles.button}>Fill Form</button>
            </div>
          </div>
          <div
            style={styles.card}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={styles.cardContent}>
              <img src={ProfessionalImage} alt="Professional" style={styles.image} />
              <h3 style={styles.cardTitle}>Professional</h3>
              <p style={styles.cardDescription}>
                Analyze your skills, identify gaps, and get insights on how to advance your career.
              </p>
              <button style={styles.button}>Fill Form</button>
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Use the Footer component */}
    </div>
  );
};

export default PostLoginLanding;