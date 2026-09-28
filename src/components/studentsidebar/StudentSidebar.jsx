import React from 'react';
import './studentsidebar.css';
import Logo from '../logo/Logo';

const StudentSidebar = ({ activeTab, setActiveTab, isOpen, onToggle }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '🎛' },
    { id: 'progress', label: 'Progress', icon: '📖' },
    { id: 'attendance', label: 'Attendance', icon: '📅' },
    { id: 'assignments', label: 'Assignment', icon: '📝' },
    { id: 'quizzes', label: 'Quiz', icon: '☑' }
  ];

  return (
    <aside className={`student-sidebar ${isOpen ? '' : 'collapsed'}`}>
      <button
        className="student-toggle-btn"
        onClick={onToggle}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? '‹' : '›'}
      </button>

      <div className="sidebar-logo-container">
        <Logo />
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item-btn ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default StudentSidebar;