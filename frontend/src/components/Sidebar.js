import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import AvatarImage from '../assets/images/Avatar.png'; // Correct the image path
import { FaBars } from 'react-icons/fa'; // Import an icon for the toggle button
import { getAuth } from 'firebase/auth'; // Import Firebase Auth to get current user
import './Sidebar.css'; // Import the CSS file for styling

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

  return (
    <>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <FaBars className="toggle-button" onClick={toggleSidebar} />
        <div className="sidebar-content">
         
          {!collapsed && (
            <>
              <div className="welcome">
                Welcome, {userName ? userName.substring(0, 6) : 'Guest'}!
              </div>
              {/* Navigation Links */}
              <div
                className="link"
                onClick={() => handleNavigation('/profile')}
              >
                <span className="link-text">View Profile</span>
              </div>
              <div
                className="link"
                onClick={() => handleNavigation('/dashboard')}
              >
                <span className="link-text">Dashboard</span>
              </div>
              <div
                className="link"
                onClick={() => handleNavigation('/notifications')}
              >
                <span className="link-text">Notifications</span>
              </div>
              <div
                className="link"
                onClick={() => handleNavigation('/SkillGap')}
              >
                <span className="link-text">Skill Gap</span>
              </div>
              <div
                className="link"
                onClick={() => handleNavigation('/ExploreCareerOptions')}
              >
                <span className="link-text">Explore</span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;