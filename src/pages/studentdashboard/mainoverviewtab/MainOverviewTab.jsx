import React from 'react';
import './mainoverviewtab.css';

const MainOverviewTab = ({ assignmentsCount, completedProgress }) => {
  return (
    <div className="overview-tab-container">
      <div className="overview-top-grid">
        {/* KPI 1 */}
        <div className="std-kpi-card">
          <div>
            <h2 className="kpi-num">94/138</h2>
            <span className="kpi-title">Attendance</span>
          </div>
          <div className="kpi-circle-icon icon-green">🕒</div>
        </div>

        {/* KPI 2 */}
        <div className="std-kpi-card">
          <div>
            <h2 className="kpi-num">{assignmentsCount}/14</h2>
            <span className="kpi-title">Assignment</span>
          </div>
          <div className="kpi-circle-icon icon-purple">🎓</div>
        </div>

        {/* Schedule Panel */}
        <div className="schedule-side-card">
          <div className="card-head-sm">
            <span>📅 Class Schedule</span>
          </div>
          <div className="schedule-days-row">
            <span className="day-box">Sun 20</span>
            <span className="day-box active">Mon 21</span>
            <span className="day-box">Tue 22</span>
            <span className="day-box active">Wed 23</span>
            <span className="day-box">Thu 24</span>
            <span className="day-box active">Fri 25</span>
            <span className="day-box">Sat 26</span>
          </div>
        </div>
      </div>

      {/* Active Course Box */}
      <div className="course-banner-card">
        <div className="cb-head">
          <h3>Active Course</h3>
        </div>
        <div className="cb-body">
          <div className="cb-title-row">
            <h2>Modern Web Application Development</h2>
            <span className="enrolled-badge">ENROLLED</span>
          </div>

          <div className="timing-pills-row">
            <span className="t-pill">Mon 01:00 PM – 03:00 PM</span>
            <span className="t-pill">Wed 01:00 PM – 03:00 PM</span>
            <span className="t-pill">Fri 01:00 PM – 03:00 PM</span>
          </div>

          <div className="progress-section-inline">
            <div className="p-lbl-line">
              <span>Progress</span>
              <span className="p-val">{completedProgress}% Completed</span>
            </div>
            <div className="p-bar-bg">
              <div className="p-bar-fill" style={{ width: `${completedProgress}%` }}></div>
            </div>
          </div>

          <div className="info-meta-grid">
            <span># Batch: <strong>20</strong></span>
            <span>🪪 Roll: <strong>490204</strong></span>
            <span>📍 Campus: <strong>Zaitoon Ashraf IT Park</strong></span>
            <span>🏙 City: <strong>Karachi</strong></span>
          </div>
        </div>
      </div>

      {/* Fee Status Card */}
      <div className="fee-summary-card">
        <h4>Fee Status</h4>
        <div className="fee-table-row">
          <div><span className="lbl">Month:</span> <strong>Sep 2026</strong></div>
          <div><span className="lbl">Amount:</span> <strong>Rs: 1000 /-</strong></div>
          <div><span className="lbl">Due Date:</span> <strong>11-Sep-2026</strong></div>
          <div><span className="paid-chip">PAID</span></div>
        </div>
      </div>
    </div>
  );
};

export default MainOverviewTab;