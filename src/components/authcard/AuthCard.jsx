import React from 'react';
import Logo from '../logo/Logo';
import './authcard.css';

const AuthCard = ({ title, subtitle, activeTab, onTabChange, children }) => {
  return (
    <div className="auth-card-container">
      {/* Sirf ek logo */}
      <Logo />

      {/* Tabs */}
      {activeTab && (
        <div className="tab-container">
          <button
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => onTabChange('login')}
          >
            Login
          </button>
          <button
            className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => onTabChange('create')}
          >
            Create Password
          </button>
        </div>
      )}

      {/* Main Card */}
      <div className="auth-card-body">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default AuthCard;