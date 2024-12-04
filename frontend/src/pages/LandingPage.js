import React from 'react';
import styled from 'styled-components';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Styled components for the UI
const Button = styled.button`
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  font-size: 1.2rem;
  margin: 0.5rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(255, 126, 95, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(255, 126, 95, 0.4);
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  background: ${({ bg }) => bg || 'white'};
  color: ${({ color }) => color || '#333'};
  text-align: center;
  min-height: 100vh;
`;

const Headline = styled(animated.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Tagline = styled(animated.p)`
  font-size: 1.5rem;
  font-weight: 400;
  color: #4a5568;
  margin-bottom: 2rem;
`;

const StoryCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  margin: 1rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const StoryImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #dfe9f3, #ffffff);
  border-radius: 15px;
  margin-bottom: 1rem;
`;

const Divider = styled.div`
  width: 80%;
  height: 1px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  margin: 2rem auto;
`;

const FloatingButton = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  box-shadow: 0 5px 15px rgba(255, 126, 95, 0.5);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(255, 126, 95, 0.6);
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();
  const headlineProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
  const taglineProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 400 });

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navbar />
      <Parallax pages={4}>
        {/* Introduction Section */}
        <ParallaxLayer offset={0} speed={0.5}>
          <Section bg="linear-gradient(to right, #6a11cb, #2575fc)" color="white">
            <Headline style={headlineProps}>Your Future, Reimagined</Headline>
            <Tagline style={taglineProps}>
              Embark on a journey to uncover your true potential and craft the career of your dreams.
            </Tagline>
            <Button onClick={() => navigate('/get-started')}>Start Your Journey</Button>
            <Button onClick={() => navigate('/learn-more')}>Learn More</Button>
          </Section>
        </ParallaxLayer>

        {/* Storytelling Section */}
        <ParallaxLayer offset={1} speed={0.5}>
          <Section>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Every Step Tells a Story</h2>
            <StoryCard>
              <StoryImagePlaceholder />
              <h3 style={{ marginBottom: '1rem' }}>The Moment of Discovery</h3>
              <p>
                It begins with a spark—a realization that there's more to life than what meets the eye. Our platform
                introduces you to your hidden talents and passions.
              </p>
            </StoryCard>
            <Divider />
            <StoryCard>
              <StoryImagePlaceholder />
              <h3 style={{ marginBottom: '1rem' }}>Empowerment Through Insights</h3>
              <p>
                By analyzing your strengths and preferences, we guide you to make informed choices that align with your
                goals and aspirations.
              </p>
            </StoryCard>
          </Section>
        </ParallaxLayer>

        {/* Testimonials Section */}
        <ParallaxLayer offset={2} speed={0.5}>
          <Section bg="linear-gradient(to right, #ebf8ff, #c3dafe)" color="#333">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Voices of Success</h2>
            <StoryCard>
              <StoryImagePlaceholder />
              <h3 style={{ marginBottom: '1rem' }}>John Doe</h3>
              <p>
                "This platform changed my life! It helped me uncover my true calling and take the first step toward a
                fulfilling career."
              </p>
            </StoryCard>
            <Divider />
            <StoryCard>
              <StoryImagePlaceholder />
              <h3 style={{ marginBottom: '1rem' }}>Jane Smith</h3>
              <p>
                "Thanks to the personalized insights, I was able to bridge skill gaps and achieve my career goals."
              </p>
            </StoryCard>
          </Section>
        </ParallaxLayer>

        {/* Call to Action */}
        <ParallaxLayer offset={3} speed={0.5}>
          <Section bg="linear-gradient(to right, #ff7e5f, #feb47b)" color="white">
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>Join the Revolution</h2>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
              Your future is waiting. Take the leap and start shaping it today.
            </p>
            <Button onClick={() => navigate('/sign-up')}>Sign Up Now</Button>
          </Section>
        </ParallaxLayer>
      </Parallax>
      <Footer />
      <FloatingButton onClick={() => navigate('/contact')}>?</FloatingButton>
    </div>
  );
};

export default LandingPage;
