import React, { useState } from 'react';
import './inputfield.css';

const InputField = ({ label, type = 'text', value, onChange, placeholder, required = false, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === 'password';
  const currentType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="input-field-container">
      <label className="input-label">
        {label} {required && <span className="required-star">*</span>}
      </label>
      <div className="input-wrapper">
        <input
          type={currentType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`custom-input ${error ? 'input-error' : ''}`}
        />
        {isPasswordType && (
          <button
            type="button"
            className="eye-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default InputField;