import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../../components/AuthCard/AuthCard';
import InputField from '../../components/InputField/InputField';
import { findStudentByCNIC, saveStudent } from '../../utils/auth';
import './createpassword.css';

const CreatePassword = () => {
  const navigate = useNavigate();
  const [cnic, setCnic] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!cnic.trim()) {
      errs.cnic = 'CNIC number is required.';
    } else if (!/^\d{5}-\d{7}-\d{1}$/.test(cnic.trim()) && !/^\d{13}$/.test(cnic.trim())) {
      errs.cnic = 'Enter valid 13 digit CNIC (e.g. 12345-1234567-1).';
    }

    if (!dob) {
      errs.dob = 'Date of birth is required.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (findStudentByCNIC(cnic.trim())) {
      setErrors({ cnic: 'An account with this CNIC already exists.' });
      return;
    }

    // Save student
    saveStudent({
      cnic: cnic.trim(),
      dob,
      password
    });

    navigate('/student-login');
  };

  const handleTabChange = (tab) => {
    if (tab === 'login') {
      navigate('/student-login');
    }
  };

  return (
    <AuthCard
      title="Create Password"
      subtitle="Provide your registered CNIC and Date of Birth to setup your student account password."
      activeTab="create"
      onTabChange={handleTabChange}
    >
      <form onSubmit={handleSubmit}>
        <InputField
          label="CNIC"
          placeholder="12345-1234567-1"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          required
          error={errors.cnic}
        />

        <InputField
          label="Date of Birth"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          error={errors.dob}
        />

        <InputField
          label="New Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={errors.password}
        />

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          error={errors.confirmPassword}
        />

        <button type="submit" className="primary-action-btn">
          CREATE PASSWORD
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

export default CreatePassword;