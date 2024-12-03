import React, { useState } from 'react';
import Header from '../components/Navbar.js'; // Correct the Header component path
import Footer from '../components/Footer.js'; // Correct the Footer component path
import LoginImage from '../assets/images/3.svg'; // Correct the image path
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate(); // React Router hook for navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    navigate("/studentorprofessional"); // Redirect to the signup route
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // Assuming authentication is successful
    toast.success('Login successful!');
    // Navigate to another page after login
    navigate('/dashboard');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #ebf8ff, #c3dafe)', color: '#2d3748', minHeight: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <Header /> {/* Use the Header component */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Login</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e0' }}
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #cbd5e0' }}
              required
            />
            <button type="button" onClick={togglePasswordVisibility} style={{ marginTop: '0.5rem', background: 'none', border: 'none', color: '#4c51bf', cursor: 'pointer' }}>
              {showPassword ? 'Hide' : 'Show'} Password
            </button>
          </div>
          <button type="submit" style={{ backgroundColor: '#4c51bf', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', width: '100%' }}>
            Login
          </button>
          <button type="button" onClick={handleSignup} style={{ marginTop: '1rem', backgroundColor: '#4c51bf', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', width: '100%' }}>
            Sign Up
          </button>
        </form>
      </div>
      <Footer /> {/* Use the Footer component */}
      <ToastContainer />
    </div>
  );
}