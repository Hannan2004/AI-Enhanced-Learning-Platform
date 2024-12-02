import React, { useState } from 'react';
import Header from '../components/Navbar.js'; // Correct the Header component path
import Footer from '../components/Footer.js'; // Correct the Footer component path
import SignupImage from '../assets/images/3.svg'; // Correct the image path

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #ebf8ff, #c3dafe)', color: '#2d3748', minHeight: '100vh', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <Header /> {/* Use the Header component */}

      {/* Signup Section */}
      <section style={{ textAlign: 'center', padding: '5rem 0', background: 'linear-gradient(to bottom, #c3dafe, #ebf8ff)', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', borderRadius: '0.5rem', padding: '2rem' }}>
            <div style={{ marginRight: '2rem' }}>
              <img src={SignupImage} alt="Signup" style={{ width: '400px', height: 'auto' }} />
            </div>
            <div>
              <form onSubmit={handleSignup}>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Signup</h2>
                <div style={{ marginBottom: '1.5rem', border: '1px solid #cbd5e0', borderRadius: '0.5rem', padding: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568' }}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email here"
                    style={{ width: 'calc(100% - 1rem)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0' }}
                    required
                  />
                </div>
                <div style={{ marginBottom: '1.5rem', border: '1px solid #cbd5e0', borderRadius: '0.5rem', padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568' }}>Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password here"
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0' }}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{
                      marginLeft: '1rem',
                      marginTop: '1.8rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#4a5568',
                      fontSize: '1rem'
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                <div style={{ marginBottom: '1.5rem', border: '1px solid #cbd5e0', borderRadius: '0.5rem', padding: '0.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568' }}>Confirm Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password here"
                    style={{ width: 'calc(100% - 1rem)', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0' }}
                    required
                  />
                </div>
                <button type="submit" style={{ backgroundColor: '#4c51bf', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', width: '100%' }}>
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer /> {/* Use the Footer component */}
    </div>
  );
};

export default SignupPage;
