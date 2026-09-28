import React from 'react';
import smitLogo from '../../assets/smit-logo.png';
import './logo.css';

const Logo = () => {
  return (
    <div className="smit-logo-wrapper">
      <img src={smitLogo} alt="SMIT Logo" className="smit-logo-img" />
    </div>
  );
};

export default Logo;