import React from 'react';
import AvatarImage from '../assets/images/Avatar.png'; // Correct the image path

const Sidebar = ({ userName }) => {
  const styles = {
    sidebar: {
      height: '100vh',
      width: '250px',
      backgroundColor: '#4c51bf',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center the avatar and welcome message
      padding: '1rem',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      justifyContent: 'space-between', // Ensure the contact details are at the bottom
      transition: 'width 0.3s ease', // Smooth transition for width change
    },
    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      marginTop: '2rem', // Add marginTop to move the avatar image down
      marginBottom: '1rem',
    },
    welcome: {
      marginBottom: '2rem',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      textAlign: 'center', // Center the welcome text
    },
    link: {
      color: '#ffffff',
      textDecoration: 'none',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      marginBottom: '0.5rem',
      transition: 'background-color 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center', // Center the link text
      width: '100%',
    },
    linkHover: {
      backgroundColor: '#2d3748',
    },
    contactDetails: {
      textAlign: 'center',
      fontSize: '0.875rem',
      marginTop: '2rem',
    },
    '@media (max-width: 768px)': {
      sidebar: {
        width: '100%', // Full width sidebar on smaller screens
        height: 'auto', // Auto height for sidebar on smaller screens
        position: 'relative', // Relative positioning on smaller screens
      },
      avatar: {
        width: '80px', // Smaller avatar on smaller screens
        height: '80px',
      },
      welcome: {
        fontSize: '1rem', // Smaller font size for welcome text on smaller screens
      },
      link: {
        padding: '0.5rem 1rem', // Smaller padding for links on smaller screens
      },
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={AvatarImage} alt="Avatar" style={styles.avatar} />
        <div style={styles.welcome}>Welcome, {userName}!</div>
        <div
          style={styles.link}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Dashboard
        </div>
        <div
          style={styles.link}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Overview
        </div>
        <div
          style={styles.link}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Chatbot
        </div>
        <div
          style={styles.link}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Notifications
        </div>
        <div
          style={styles.link}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Tasks
        </div>
        <div
          style={styles.link}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Explore All Career Options
        </div>
      </div>
      <div style={styles.contactDetails}>
        <p>Email: contact@example.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 123 Main St, Anytown, USA</p>
      </div>
    </div>
  );
};

export default Sidebar;