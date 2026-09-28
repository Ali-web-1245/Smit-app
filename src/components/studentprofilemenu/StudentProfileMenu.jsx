import React, { useState } from 'react';
import './stdprofilemenu.css';
import { CircleUserRound } from 'lucide-react';

const StdentProfileMenu = ({ isDarkMode, setIsDarkMode, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="profile-menu-container">
      {/* Bottom-left user trigger area */}
      <div className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
       <CircleUserRound size={32} strokeWidth={1.5} />
        <span className="profile-name">Student</span>
      </div>

      {/* Popover Menu */}
      {isOpen && (
        <div className="profile-dropdown-menu">
          <div className="menu-header">
            <strong>Name</strong>
            <span className="user-role">Student</span>
          </div>

          <hr className="menu-divider" />

          {/* Theme Switcher Options */}
          <div className="theme-switcher-section">
            <span className="theme-label">Theme Options</span>
            <div className="theme-toggle-buttons">
              <button 
                className={`theme-btn ${!isDarkMode ? 'active' : ''}`}
                onClick={() => setIsDarkMode(false)}
              >
                ☀️ White (Light)
              </button>
              <button 
                className={`theme-btn ${isDarkMode ? 'active' : ''}`}
                onClick={() => setIsDarkMode(true)}
              >
                🌙 Dark
              </button>
            </div>
          </div>

          <hr className="menu-divider" />

          {/* Logout Button */}
          <button className="logout-menu-btn" onClick={onLogout}>
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default StdentProfileMenu;