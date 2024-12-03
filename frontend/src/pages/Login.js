import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import LoginImage from '../assets/images/3.svg';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirect to dashboard or home page
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
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
            <img src={LoginImage} alt="Login" style={{ width: '400px', height: 'auto' }} />
          </div>
          <form onSubmit={handleLogin} style={{ width: '300px' }}>
            <h2 style={{ 
              fontSize: '2.25rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem', 
              textAlign: 'center' 
            }}>
              Login
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
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: '1.5rem'
            }}>
              <button 
                type="submit" 
                style={{ 
                  flex: 1, 
                  padding: '0.75rem', 
                  backgroundColor: '#4c51bf', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '0.25rem',
                  marginRight: '0.5rem'
                }}
              >
                Login
              </button>
              <button 
                type="button" 
                onClick={handleSignup}
                style={{ 
                  flex: 1, 
                  padding: '0.75rem', 
                  backgroundColor: '#4c51bf', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '0.25rem',
                  marginLeft: '0.5rem'
                }}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}