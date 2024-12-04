import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import SignupImage from '../assets/images/3.svg';
import axios from 'axios';

export default function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validations
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/signup', {
        username,
        email,
        password,
      });
      
      // Successful signup
      alert('Registration successful. Please login.');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.error || 'Signup failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(to right, #ebf8ff, #c3dafe)', 
      color: '#2d3748', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      <section style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '2rem'
      }}>
        <div style={{ 
          display: 'flex', 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          borderRadius: '0.5rem', 
          padding: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginRight: '2rem' }}>
            <img src={SignupImage} alt="Signup" style={{ width: '400px', height: 'auto' }} />
          </div>
          <form onSubmit={handleSignup} style={{ width: '300px' }}>
            <h2 style={{ 
              fontSize: '2.25rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem', 
              textAlign: 'center' 
            }}>
              Signup
            </h2>
            {error && (
              <div style={{ 
                color: 'red', 
                marginBottom: '1rem', 
                textAlign: 'center' 
              }}>
                {error}
              </div>
            )}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '0.25rem', 
                  border: '1px solid #cbd5e0' 
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  minLength={6}
                  style={{ 
                    flex: 1, 
                    padding: '0.5rem', 
                    borderRadius: '0.25rem', 
                    border: '1px solid #cbd5e0' 
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    marginLeft: '0.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={6}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '0.25rem', 
                  border: '1px solid #cbd5e0' 
                }}
              />
            </div>
            <button 
              type="submit" 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                backgroundColor: '#4c51bf', 
                color: 'white', 
                border: 'none', 
                borderRadius: '0.25rem',
                marginTop: '1rem'
              }}
            >
              Signup
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}