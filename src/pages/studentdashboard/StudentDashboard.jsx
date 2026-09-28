import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '../../components/studentsidebar/StudentSidebar';
import ProfileMenu from '../../components/studentprofilemenu/StudentProfileMenu';
import MainOverviewTab from './mainoverviewtab/MainOverviewTab';
import StudentProgressTab from './studentprogresstab/StudentProgressTab';
import StudentAttendanceTab from './studentattendancetab/StudentAttendanceTab';
import StudentAssignmentsTab from './studentassignmentstab/StudentAssignmentsTab';
import StudentQuizTab from './studentquiztab/StudentQuizTab';
import { getStoredAssignments, getStoredCourseModules } from '../../utils/dummy';
import { logout } from '../../utils/auth';
import './studentdashboard.css';

const MOBILE_BREAKPOINT = 900;

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [modules, setModules] = useState([]);
  // Desktop par shuru mein khuli, tablet/mobile par band
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => window.innerWidth > MOBILE_BREAKPOINT
  );

  useEffect(() => {
    setAssignments(getStoredAssignments() || []);
    setModules(getStoredCourseModules() || []);

    const syncHandler = () => {
      setAssignments(getStoredAssignments() || []);
      setModules(getStoredCourseModules() || []);
    };

    window.addEventListener('assignments_updated', syncHandler);
    return () => window.removeEventListener('assignments_updated', syncHandler);
  }, []);

  // Screen size badle to sidebar ki state theek rahe
  useEffect(() => {
    let wasMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const onResize = () => {
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      if (isMobile !== wasMobile) {
        setIsSidebarOpen(!isMobile);
        wasMobile = isMobile;
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  let totalTopics = 0;
  let doneTopics = 0;
  modules.forEach((m) => {
    (m.topics || []).forEach((t) => {
      totalTopics++;
      if (t.completed) doneTopics++;
    });
  });
  const completedProgress =
    totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  const handleLogout = () => {
    logout();
    navigate('/student-login');
  };

  // Mobile/tablet par menu item dabane par sidebar band ho jaye
  const handleSidebarTab = (id) => {
    setActiveTab(id);
    if (window.innerWidth <= MOBILE_BREAKPOINT) setIsSidebarOpen(false);
  };

  return (
    <div
      className={`student-dashboard-layout ${isDarkMode ? 'theme-dark' : 'theme-light'} ${
        isSidebarOpen ? '' : 'sidebar-collapsed'
      }`}
    >
      {isSidebarOpen && (
        <div
          className="student-sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <StudentSidebar
        activeTab={activeTab}
        setActiveTab={handleSidebarTab}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
      />

      <div className="student-profile-wrap">
        <ProfileMenu
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onLogout={handleLogout}
        />
      </div>

      <main className="student-main-content">
        <header className="student-header-bar">
          <div className="breadcrumb">
            Home &gt; <span>Modern Web Application Development</span>
          </div>
          <button className="feedback-btn">💬 Feedback</button>
        </header>

        <div className="tab-render-area">
          {activeTab === 'overview' && (
            <MainOverviewTab
              assignmentsCount={assignments.length}
              completedProgress={completedProgress}
            />
          )}
          {activeTab === 'progress' && <StudentProgressTab />}
          {activeTab === 'attendance' && <StudentAttendanceTab />}
          {activeTab === 'assignments' && <StudentAssignmentsTab />}
          {activeTab === 'quizzes' && <StudentQuizTab />}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;