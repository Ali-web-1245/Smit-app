import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../../components/authCard/AuthCard';
import InputField from '../../components/inputField/InputField';
import { authenticateTeacher, setCurrentUser } from '../../utils/auth';
import './teacherlogin.css';

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = 'Teacher email is required.';
    if (!password) errs.password = 'Password is required.';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setFormError('');

    if (!validate()) return;

    const result = authenticateTeacher(email.trim(), password);

    if (result.success) {
      setCurrentUser(result.user);
      navigate('/teacher-dashboard');
    } else {
      setFormError(result.message);
    }
  };

  return (
    <AuthCard
      title="Teacher Login"
      subtitle="Access teacher portal with authorized credentials."
    >
      {formError && <div className="general-form-error">{formError}</div>}

      <form onSubmit={handleLogin}>
        <InputField
          label="Teacher Email"
          type="email"
          placeholder="teacher@smit.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={fieldErrors.email}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
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
        onClick={() => navigate('/student-login')}
      >
        Back to Student Login
      </button>
    </AuthCard>
  );
};

export default TeacherLogin;