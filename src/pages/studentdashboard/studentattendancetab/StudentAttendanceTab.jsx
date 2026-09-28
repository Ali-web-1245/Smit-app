import React, { useState } from 'react';
import './studentattendancetab.css';

const dummyAttendanceLogs = [
  { classNo: 1, date: 'Tue, Sep 1, 2026', status: 'PRESENT' },
  { classNo: 2, date: 'Thu, Sep 3, 2026', status: 'PRESENT' },
  { classNo: 3, date: 'Sun, Sep 6, 2026', status: 'ABSENT' },
  { classNo: 4, date: 'Tue, Sep 8, 2026', status: 'PRESENT' },
  { classNo: 5, date: 'Thu, Sep 10, 2026', status: 'PRESENT' },
  { classNo: 6, date: 'Sun, Sep 13, 2026', status: 'ABSENT' },
  { classNo: 7, date: 'Tue, Sep 15, 2026', status: 'PRESENT' },
  { classNo: 8, date: 'Thu, Sep 17, 2026', status: 'PRESENT' },
  { classNo: 9, date: 'Sun, Sep 20, 2026', status: 'PRESENT' },
  { classNo: 10, date: 'Tue, Sep 22, 2026', status: 'PRESENT' },
  { classNo: 11, date: 'Thu, Sep 24, 2026', status: 'PRESENT' },
  { classNo: 12, date: 'Sun, Sep 27, 2026', status: 'PRESENT' }
];

const TOTAL_CLASSES = 130;
const PRESENT = 94;
const LEAVE = 0;
const ABSENT = 36;

const StudentAttendanceTab = () => {
  const [selectedMonth, setSelectedMonth] = useState('Sep 2026');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const percentage = Math.round((PRESENT / TOTAL_CLASSES) * 100);
  const isLow = percentage < 75;

  const totalPages = Math.ceil(dummyAttendanceLogs.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentLogs = dummyAttendanceLogs.slice(startIndex, startIndex + pageSize);

  return (
    <div className="std-attendance-tab">
      {/* Stat Cards */}
      <div className="att-stats-cards">
        <div className="att-card">
          <span className="att-num">{TOTAL_CLASSES}</span>
          <span className="att-lbl">Total Classes</span>
        </div>
        <div className="att-card">
          <span className="att-num green-txt">{PRESENT}</span>
          <span className="att-lbl">Present</span>
        </div>
        <div className="att-card">
          <span className="att-num yellow-txt">{LEAVE}</span>
          <span className="att-lbl">Leave</span>
        </div>
        <div className="att-card">
          <span className="att-num red-txt">{ABSENT}</span>
          <span className="att-lbl">Absent</span>
        </div>
      </div>

      {/* Percentage Banner */}
      <div className="att-progress-card">
        <div className="p-head-row">
          <div>
            <h4>Attendance Overview</h4>
            <p className={`warning-text ${isLow ? '' : 'good-text'}`}>
              {isLow
                ? 'Your attendance is below 75%. Please improve.'
                : 'Great! Your attendance is above 75%.'}
            </p>
          </div>
          <span className={`att-percentage ${isLow ? 'low' : 'good'}`}>{percentage}%</span>
        </div>
        <div className="att-bar-bg">
          <div
            className={`att-bar-fill ${isLow ? 'low' : 'good'}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="att-table-wrapper">
        <div className="table-top-actions">
          <select
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              setCurrentPage(1);
            }}
            className="month-picker"
          >
            <option>Sep 2026</option>
            <option>Aug 2026</option>
            <option>Jul 2026</option>
          </select>
        </div>

        <div className="att-logs-table">
          <div className="att-th">
            <span>Class</span>
            <span>Date</span>
            <span>Status</span>
          </div>

          {currentLogs.map((log) => (
            <div className="att-tr" key={log.classNo}>
              <span className="att-class-no" data-label="Class">{log.classNo}</span>
              <span data-label="Date">{log.date}</span>
              <span data-label="Status">
                <span className={`status-pill ${log.status.toLowerCase()}`}>{log.status}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="std-pagination-bar">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            &lt; Previous
          </button>
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceTab;