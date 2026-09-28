import React from 'react';
import Logo from '../logo/Logo';
import './teachersidebar.css';

const TeacherSidebar = ({ activeTab, setActiveTab, isOpen, onToggle }) => {
  const menuItems = [
    { id: 'students', label: 'Students', icon: '👥' },
    { id: 'attendance', label: 'Attendance', icon: '📅' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
    { id: 'quizzes', label: 'Quizzes', icon: '☑' },
    { id: 'progress', label: 'Course Progress', icon: '📊' }
  ];

  return (
    <aside className={`teacher-sidebar ${isOpen ? '' : 'collapsed'}`}>
      <button
        className="sidebar-toggle-btn"
        onClick={onToggle}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? '‹' : '›'}
      </button>

      <div className="teacher-sidebar-logo">
        <Logo />
      </div>

      <nav className="teacher-sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`teacher-nav-btn ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default TeacherSidebar;