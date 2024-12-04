import React from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import LandingImage from '../assets/images/Landingmain.svg';
import { useNavigate } from "react-router-dom";
import Spline from '@splinetool/react-spline';

const buttonStyle = {
  backgroundColor: '#4c51bf',
  color: '#ffffff',
  padding: '0.75rem 2rem',
  borderRadius: '0.5rem',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
  marginRight: '1rem',
  fontSize: '1rem',
  transition: 'transform 0.2s',
};

const cardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  borderRadius: '0.5rem',
  padding: '1.5rem',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s',
};

const LandingPage = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleLoginClick = () => {
    navigate("/login"); // Redirect to the login route
  };

  const handleFeatureClick = (feature) => {
    navigate(`/features/${feature}`); // Navigate to the feature page
  };

  return (
    <div style={{ background: 'linear-gradient(to right, #ebf8ff, #c3dafe)', color: '#2d3748', minHeight: '100vh', margin: 0, padding: 0 }}>
      <Navbar /> {/* Use the Header component */}

      {/* Spline Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
        <Spline scene="https://prod.spline.design/8c-TkE4OOKRUMooo/scene.splinecode" />
      </div>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '5rem 0', background: 'linear-gradient(to bottom, #c3dafe, #ebf8ff)' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Discover Your Perfect Career</h2>
        <p style={{ fontSize: '1.125rem', color: '#4a5568', marginBottom: '1.5rem' }}>
          Make smart decisions with our revolutionary AI enabled career guidance tools and expert career counsellors.
        </p>
        <div>
          <button style={buttonStyle}>
            Get Started
          </button>
          <button style={buttonStyle} onClick={handleLoginClick}>
            Login
          </button>
        </div>
        <p style={{ fontSize: '1rem', color: '#4a5568', marginTop: '1.5rem' }}>
          Career Assessment | Personalised Guidance | Profile Building
        </p>
      </section>

      {/* Image Section */}
      <section style={{ textAlign: 'center', padding: '2rem 0', background: 'none' }}>
        <img src={LandingImage} alt="Landing" style={{ maxWidth: '50%', height: 'auto', display: 'block', margin: '0 auto' }} />
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '5rem 0', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2.5rem' }}>Key Features</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
            <FeatureCard
              title="Aptitude Assessment"
              description="Evaluate strengths, inclinations, and cognitive abilities with AI."
              onClick={() => handleFeatureClick('aptitude-assessment')}
            />
            <FeatureCard
              title="Career Recommendations"
              description="Tailored recommendations based on aspirations and interests."
              onClick={() => handleFeatureClick('career-recommendations')}
            />
            <FeatureCard
              title="Skill Gap Analysis"
              description="Identify skill gaps and recommend learning resources."
              onClick={() => handleFeatureClick('skill-gap-analysis')}
            />
            <FeatureCard
              title="Future Planning"
              description="Predict industry trends and provide progression opportunities."
              onClick={() => handleFeatureClick('future-planning')}
            />
            <FeatureCard
              title="Personalised Results"
              description="Track progress and career insights in real-time."
              onClick={() => handleFeatureClick('personalised-results')}
            />
            <FeatureCard
              title="Interactive Chatbot"
              description="Conversational interface to guide and assist users."
              onClick={() => handleFeatureClick('interactive-chatbot')}
            />
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" style={{ padding: '5rem 0', backgroundColor: '#f7fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2.5rem' }}>Who Can Use This Site?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
            <InsightCard
              title="High School Students"
              description="Explore career options and get guidance on choosing the right path for your future."
            />
            <InsightCard
              title="Undergrad Students"
              description="Identify your strengths and get personalized recommendations to enhance your career prospects."
            />
            <InsightCard
              title="Working Professionals"
              description="Analyze your skills, identify gaps, and get insights on how to advance your career."
            />
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" style={{ padding: '5rem 0', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2.5rem' }}>Success Stories</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
            <SuccessStory
              name="John Doe"
              story="Career Pathfinder AI helped me identify my strengths and choose a career path that I am passionate about. The personalized recommendations were spot on!"
            />
            <SuccessStory
              name="Jane Smith"
              story="The skill gap analysis feature was a game-changer for me. It highlighted the areas I needed to improve and provided resources to help me get there."
            />
            <SuccessStory
              name="Michael Johnson"
              story="The future planning feature gave me insights into industry trends and helped me plan my career progression effectively. Highly recommend!"
            />
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry" style={{ padding: '5rem 0', backgroundColor: '#f7fafc' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', borderRadius: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2.5rem' }}>Enquiry Form</h3>
          <form>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568' }}>Name</label>
              <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0' }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568' }}>Email</label>
              <input type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0' }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#4a5568' }}>Message</label>
              <textarea style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e0', resize: 'vertical' }} rows="4"></textarea>
            </div>
            <button type="submit" style={{ backgroundColor: '#4c51bf', color: '#ffffff', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', width: '100%' }}>
              Submit
            </button>
          </form>
        </div>
      </section>

      <Footer /> {/* Use the Footer component */}
    </div>
  );
};

// Reusable FeatureCard Component
const FeatureCard = ({ title, description, onClick }) => {
  return (
    <div onClick={onClick} style={cardStyle}>
      <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{title}</h4>
      <p style={{ color: '#718096' }}>{description}</p>
    </div>
  );
};

// Reusable SuccessStory Component
const SuccessStory = ({ name, story }) => {
  return (
    <div style={cardStyle}>
      <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{name}</h4>
      <p style={{ color: '#718096' }}>{story}</p>
    </div>
  );
};

// Reusable InsightCard Component
const InsightCard = ({ title, description }) => {
  return (
    <div style={cardStyle}>
      <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{title}</h4>
      <p style={{ color: '#718096' }}>{description}</p>
    </div>
  );
};

export default LandingPage;