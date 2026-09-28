import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreatePassword from './pages/createpassword/CreatePassword';
import StudentLogin from './pages/studentlogin/StudentLogin';
import TeacherLogin from './pages/teacherlogin/TeacherLogin';
import StudentDashboard from './pages/studentdashboard/StudentDashboard';
import TeacherDashboard from './pages/teacherdashboard/TeacherDashboard';
import { getCurrentUser } from './utils/auth';

// Protected Route Guard
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/student-login" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to={user.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard'} replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route redirects to Create Password */}
        <Route path="/" element={<Navigate to="/create-password" replace />} />

        {/* Public Auth Routes */}
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute allowedRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/create-password" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;