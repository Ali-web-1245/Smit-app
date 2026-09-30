import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from "../../components/authcard/AuthCard";
import InputField from "../../components/inputfield/InputField";
import { authenticateStudent, setCurrentUser } from '../../utils/auth';
import './studentlogin.css';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!cnic.trim()) errs.cnic = 'CNIC is required.';
    if (!password) errs.password = 'Password is required.';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validate()) return;

    const result = authenticateStudent(cnic.trim(), password);

    if (result.success) {
      setCurrentUser(result.user);
      navigate('/student-dashboard');
    } else {
      setFormError(result.message);
    }
  };

  const handleTabChange = (tab) => {
    if (tab === 'create') {
      navigate('/create-password');
    }
  };

  return (
    <AuthCard
      title="Login"
      subtitle="Kindly provide the CNIC number and password used during SMIT course registration."
      activeTab="login"
      onTabChange={handleTabChange}
    >
      {formError && <div className="general-form-error">{formError}</div>}

      <form onSubmit={handleLogin}>
        <InputField
          label="CNIC"
          placeholder="12345-1234567-1"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          required
          error={fieldErrors.cnic}
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={fieldErrors.password}
        />

        <button type="submit" className="primary-action-btn">
          LOGIN
        </button>
      </form>

      <button
        type="button"
        className="secondary-teacher-btn"
        onClick={() => navigate('/teacher-login')}
      >
        Login as teacher
      </button>
    </AuthCard>
  );
};

export default StudentLogin;