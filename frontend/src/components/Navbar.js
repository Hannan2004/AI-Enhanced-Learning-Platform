import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const styles = {
    header: {
      backgroundColor: '#4c51bf',
      color: '#ffffff',
      padding: '1rem',
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 1.5rem',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    nav: {
      display: 'flex',
      gap: '1.5rem',
    },
    link: {
      textDecoration: 'none',
      color: '#ffffff',
      position: 'relative',
      padding: '0.5rem 1rem',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
      cursor: 'pointer',
    },
    linkHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.05)',
    },
    '@media (max-width: 768px)': {
      container: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      nav: {
        flexDirection: 'column',
        gap: '1rem',
      },
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.title}>Career Pathfinder AI</h1>
        <nav>
          <ul style={styles.nav}>
            <li>
              <span
                style={styles.link}
                onClick={() => handleNavigation('/dashboard')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor;
                  e.currentTarget.style.transform = styles.linkHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                Dashboard
              </span>
            </li>
            <li>
              <span
                style={styles.link}
                onClick={() => handleNavigation('/profile')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor;
                  e.currentTarget.style.transform = styles.linkHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                Profile
              </span>
            </li>
            <li>
              <span
                style={styles.link}
                onClick={() => handleNavigation('/features')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor;
                  e.currentTarget.style.transform = styles.linkHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                Features
              </span>
            </li>
            <li>
              <span
                style={styles.link}
                onClick={() => handleNavigation('/about')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor;
                  e.currentTarget.style.transform = styles.linkHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                About
              </span>
            </li>
            <li>
              <span
                style={styles.link}
                onClick={() => handleNavigation('/contact')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = styles.linkHover.backgroundColor;
                  e.currentTarget.style.transform = styles.linkHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                Contact
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}