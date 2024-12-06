import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarImage from '../assets/images/Avatar.png'; // Correct the image path
import { FaBars } from 'react-icons/fa'; // Import an icon for the toggle button
import { getAuth } from 'firebase/auth'; // Import Firebase Auth to get current user

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Fetch the currently logged-in user's name from Firebase Authentication
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserName(user.displayName || user.email); // If the user has a display name, use it, otherwise use their email
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const styles = {
    sidebar: {
      height: '100vh',
      width: collapsed ? '80px' : '250px',
      backgroundColor: 'rgba(0, 51, 102, 0.9)', // Bold blue background color with transparency
      backdropFilter: 'blur(10px)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Center the avatar and welcome message
      padding: '1rem',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      justifyContent: 'space-between', // Ensure the contact details are at the bottom
      transition: 'width 0.3s ease', // Smooth transition for width change
      borderRadius: '10px',
      margin: '2rem',
    },
    toggleButton: {
      alignSelf: 'flex-end',
      marginBottom: '1rem',
      cursor: 'pointer',
      color: '#ffffff',
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
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    linkText: {
      marginLeft: '10px',
    },
    linkHover: {
      backgroundColor: '#FF7F7F',
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
      <FaBars style={styles.toggleButton} onClick={toggleSidebar} />
      {!collapsed && (
        <>
          <FaBars style={styles.toggleButton} onClick={toggleSidebar} />
          {!collapsed && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={AvatarImage} alt="Avatar" style={styles.avatar} />
                <div style={styles.welcome}>
                  Welcome, {userName ? userName.substring(0, 6) : 'Guest'}!
                </div>
                {/* Navigation Links */}
                <div
                  style={styles.link}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => handleNavigation('/profile')}
                >
                  <span style={styles.linkText}>View Profile</span>
                </div>
                <div
                  style={styles.link}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => handleNavigation('/dashboard')}
                >
                  <span style={styles.linkText}>Dashboard</span>
                </div>
                <div
                  style={styles.link}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => handleNavigation('/notifications')}
                >
                  <span style={styles.linkText}>Notifications</span>
                </div>
                <div
                  style={styles.link}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => handleNavigation('/SkillGap')}
                >
                  <span style={styles.linkText}>Skill Gap</span>
                </div>
                <div
                  style={styles.link}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => handleNavigation('/ExploreCareerOptions')}
                >
                  <span style={styles.linkText}>Explore </span>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;
