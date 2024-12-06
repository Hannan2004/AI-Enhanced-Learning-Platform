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

    // Adjust the body margin dynamically when the sidebar is toggled
    document.body.style.marginLeft = collapsed ? '250px' : '80px';
  };

  const styles = {
    sidebar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: collapsed ? '80px' : '250px',
      backgroundColor: 'rgba(0, 51, 102, 0.9)', // Bold blue background color
      backdropFilter: 'blur(10px)',
      color: '#ffffff',
      padding: '1rem',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'width 0.3s ease',
      zIndex: 1000, // Ensure sidebar is above the content
    },
    contentSpacing: {
      marginLeft: collapsed ? '80px' : '250px',
      transition: 'margin-left 0.3s ease',
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
      marginTop: '2rem',
      marginBottom: '1rem',
    },
    welcome: {
      marginBottom: '2rem',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    link: {
      color: '#ffffff',
      textDecoration: 'none',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      marginBottom: '0.5rem',
      transition: 'background-color 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
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
  };

  return (
    <>
      <div style={styles.sidebar}>
        <FaBars style={styles.toggleButton} onClick={toggleSidebar} />
        {!collapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={AvatarImage} alt="Avatar" style={styles.avatar} />
            <div style={styles.welcome}>
              Welcome, {userName ? userName.substring(0, 6) : 'Guest'}!
            </div>
            {/* Navigation Links */}
            <div
              style={styles.link}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              onClick={() => handleNavigation('/profile')}
            >
              <span style={styles.linkText}>View Profile</span>
            </div>
            <div
              style={styles.link}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              onClick={() => handleNavigation('/dashboard')}
            >
              <span style={styles.linkText}>Dashboard</span>
            </div>
            <div
              style={styles.link}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              onClick={() => handleNavigation('/notifications')}
            >
              <span style={styles.linkText}>Notifications</span>
            </div>
            <div
              style={styles.link}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              onClick={() => handleNavigation('/SkillGap')}
            >
              <span style={styles.linkText}>Skill Gap</span>
            </div>
            <div
              style={styles.link}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              onClick={() => handleNavigation('/ExploreCareerOptions')}
            >
              <span style={styles.linkText}>Explore</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
