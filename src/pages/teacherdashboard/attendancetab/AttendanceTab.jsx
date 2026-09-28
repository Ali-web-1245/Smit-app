import React, { useState, useEffect } from 'react';
import { fetchApiStudents } from '../../../utils/sharedStore';
import './attendancetab.css';

const AttendanceTab = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2026-09-27');
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchApiStudents();
      setAllStudents(data || []);
    };
    loadData();
  }, []);

  const getStudentStatus = (roll) => {
    return attendanceRecords[selectedDate]?.[roll] || 'NOT MARKED';
  };

  const setStudentStatus = (roll) => {
    const currentStatus = getStudentStatus(roll);
    const nextStatus =
      currentStatus === 'PRESENT' ? 'ABSENT' : currentStatus === 'ABSENT' ? 'LEAVE' : 'PRESENT';

    setAttendanceRecords((prev) => ({
      ...prev,
      [selectedDate]: {
        ...(prev[selectedDate] || {}),
        [roll]: nextStatus
      }
    }));
  };

  const totalPages = Math.ceil(allStudents.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentDisplayed = allStudents.slice(startIndex, startIndex + pageSize);

  const dateRecord = attendanceRecords[selectedDate] || {};
  const presentCount = Object.values(dateRecord).filter((s) => s === 'PRESENT').length;
  const absentCount = Object.values(dateRecord).filter((s) => s === 'ABSENT').length;
  const leaveCount = Object.values(dateRecord).filter((s) => s === 'LEAVE').length;

  const showingFrom = allStudents.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + pageSize, allStudents.length);

  return (
    <div className="attendance-tab">
      <div className="date-picker-row">
        <label htmlFor="att-date">Select Date for Attendance Log:</label>
        <input
          id="att-date"
          type="date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setCurrentPage(1);
          }}
          className="date-input"
        />
      </div>

      <div className="att-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">🕒</div>
          <div>
            <span className="kpi-val">{allStudents.length}</span>
            <span className="kpi-lbl">Total Students</span>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon green-icon">✓</div>
          <div>
            <span className="kpi-val">{presentCount}</span>
            <span className="kpi-lbl">Present ({selectedDate})</span>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon red-icon">✕</div>
          <div>
            <span className="kpi-val">{absentCount}</span>
            <span className="kpi-lbl">Absent</span>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon yellow-icon">!</div>
          <div>
            <span className="kpi-val">{leaveCount}</span>
            <span className="kpi-lbl">Leave</span>
          </div>
        </div>
      </div>

      <div className="data-table-card">
        <div className="att-table-header">
          <span>Roll #</span>
          <span>Full Name</span>
          <span>Status (Click to toggle status)</span>
        </div>

        {currentDisplayed.length === 0 && <p className="att-empty">No students found.</p>}

        {currentDisplayed.map((std) => {
          const status = getStudentStatus(std.roll);
          return (
            <div className="att-table-row" key={std.roll}>
              <span className="att-roll" data-label="Roll #">{std.roll}</span>
              <span className="std-full-name" data-label="Full Name">{std.name}</span>
              <div className="att-status-cell" data-label="Status">
                <button
                  className={`status-btn ${status.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setStudentStatus(std.roll)}
                >
                  {status}
                </button>
              </div>
            </div>
          );
        })}

        <div className="table-footer">
          <span className="footer-info">
            Showing {showingFrom}-{showingTo} of {allStudents.length} students
          </span>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt; Previous
            </button>
            <span className="page-indicator">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTab;