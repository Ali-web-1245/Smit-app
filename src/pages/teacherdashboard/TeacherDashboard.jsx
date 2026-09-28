import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherSidebar from '../../components/teachersidebar/TeacherSidebar';
import ProfileMenu from '../../components/profilemenu/ProfileMenu';
import StudentsTab from './studentstab/StudentsTab';
import AttendanceTab from './attendancetab/AttendanceTab';
import AssignmentsTab from './assignmentstab/AssignmentsTab';
import QuizzesTab from './quizzestab/QuizzesTab';
import CourseProgressTab from './courseprogresstab/CourseProgressTab';
import { logout } from '../../utils/auth';
import './teacherdashboard.css';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('assignments');
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Desktop par shuru mein khuli, mobile par band
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth > 768);

  const handleLogout = () => {
    logout();
    navigate('/teacher-login');
  };

  const handleSidebarTab = (id) => {
    setActiveTab(id);
    if (window.innerWidth <= 768) setIsSidebarOpen(false);
  };

  const tabs = [
    { id: 'students', label: '👥 Students' },
    { id: 'attendance', label: '📅 Attendance' },
    { id: 'assignments', label: '📝 Assignments' },
    { id: 'quizzes', label: '☑ Quizzes' },
    { id: 'progress', label: '📊 Course Progress' }
  ];

  return (
    <div
      className={`teacher-layout ${isDarkMode ? 'dark-mode' : ''} ${
        isSidebarOpen ? '' : 'sidebar-collapsed'
      }`}
    >
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      <TeacherSidebar
        activeTab={activeTab}
        setActiveTab={handleSidebarTab}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
      />

      <ProfileMenu
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onLogout={handleLogout}
      />

      <div className="teacher-main-area">
        <header className="teacher-top-header">
          <div className="breadcrumb-line">
            Dashboard &gt; <span>Modern Web Application Development</span>
          </div>
          <button className="feedback-outline-btn">💬 Feedback</button>
        </header>

        <div className="course-title-banner">
          <h2>Modern Web Application Development</h2>
        </div>

        <div className="tabs-navigation-bar">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="tab-view-viewport">
          {activeTab === 'students' && <StudentsTab />}
          {activeTab === 'attendance' && <AttendanceTab />}
          {activeTab === 'assignments' && <AssignmentsTab />}
          {activeTab === 'quizzes' && <QuizzesTab />}
          {activeTab === 'progress' && <CourseProgressTab />}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;