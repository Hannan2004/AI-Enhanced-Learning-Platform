import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';
import HeroBgImage from '../assets/images/herobg.png';
import appLogo from '../assets/images/daan.png';

const headerStyle = {
  backgroundColor: 'rgba(76, 81, 191, 0.3)',
  backdropFilter: 'blur(10px)',
  color: '#ffffff',
  padding: '1rem',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navStyle = {
  display: 'flex',
  gap: '1.5rem',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#ffffff',
  position: 'relative',
  padding: '0.5rem 1rem',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  cursor: 'pointer',
};

const linkHoverStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  transform: 'scale(1.05)',
};

const heroSectionStyle = {
  textAlign: 'center',
  background: `url(${HeroBgImage}) no-repeat center center/cover`,
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const frostedGlassStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  padding: '2rem',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  border: '1px solid #CBD5E0',
  borderRadius: '0.5rem',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
};

const buttonStyle = {
  backgroundColor: '#4c51bf',
  color: '#ffffff',
  padding: '0.75rem 2rem',
  borderRadius: '0.5rem',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
  fontSize: '1rem',
  width: '100%',
  transition: 'transform 0.2s',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setSuccess('Login successful!');
      setError('');
      navigate('/dashboard', { state: { userId: user.uid } });
    } catch (error) {
      setError('Login failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #ebf8ff, #c3dafe)', color: '#2d3748', minHeight: '100vh', margin: 0, padding: 0 }}>
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={appLogo} alt="Udaan Logo" style={{ width: '100px', height: 'auto', marginRight: '1rem' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>उड़ान</h1>
        </div>
        <nav style={navStyle}>
          <span
            style={linkStyle}
            onClick={() => handleNavigation('/ExploreCareerOptions')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
              e.currentTarget.style.transform = linkHoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Career Library
          </span>
          <span
            style={linkStyle}
            onClick={() => handleNavigation('/contact')}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor;
              e.currentTarget.style.transform = linkHoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'none';
            }}
          >
            Contact
          </span>
        </nav>
      </header>

      <section style={heroSectionStyle}>
        <div style={frostedGlassStyle}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#2d3748' }}>
            Login to Your Account
          </h2>
          
          {error && (
            <div style={{ 
              backgroundColor: '#FED7D7', 
              color: '#9B2C2C', 
              padding: '0.75rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem' 
            }}>
              {error}
            </div>
          )}
          
          {success && (
            <div style={{ 
              backgroundColor: '#C6F6D5', 
              color: '#22543D', 
              padding: '0.75rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem' 
            }}>
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
            <button 
              type="submit" 
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
              }}
            >
              Login
            </button>
          </form>
          <p style={{ 
            marginTop: '1rem', 
            fontSize: '0.875rem', 
            color: '#4A5568',
            textAlign: 'center'
          }}>
            Don't have an account? 
            <span 
              onClick={() => handleNavigation('/signup')} 
              style={{ 
                color: '#4c51bf', 
                marginLeft: '0.5rem', 
                cursor: 'pointer', 
                fontWeight: 'bold' 
              }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;