import React, { useState } from 'react';
import './profilemenu.css';
import { CircleUserRound } from 'lucide-react';



const ProfileMenu = ({ onLogout, isDarkMode, setIsDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="profile-menu-wrapper">
      <div className="profile-avatar-btn" onClick={() => setIsOpen(!isOpen)}>
       <CircleUserRound size={32} strokeWidth={1.5} />
      </div>

      {isOpen && (
        <div className="profile-popover-menu">
          <div className="popover-header">
            <p className="popover-name">S Muzammil Javed</p>
            <p className="popover-role">Lead Trainer / Teacher</p>
          </div>
          <hr className="divider" />
          <button className="popover-item" onClick={() => alert("Profile View: S Muzammil Javed (ID: TR-8902)")}>
            👤 View Profile
          </button>
          <button className="popover-item" onClick={() => { setIsDarkMode(!isDarkMode); setIsOpen(false); }}>
            {isDarkMode ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
          </button>
          <hr className="divider" />
          <button className="popover-item logout-red" onClick={onLogout}>
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;