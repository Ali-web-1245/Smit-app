import React, { useState, useEffect } from 'react';
import { getStoredAssignments } from '../../../utils/dummy';
import './studentassignmenttab.css';

const StudentAssignmentsTab = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    setAssignments(getStoredAssignments() || []);

    const handleSync = () => setAssignments(getStoredAssignments() || []);
    window.addEventListener('assignments_updated', handleSync);
    return () => window.removeEventListener('assignments_updated', handleSync);
  }, []);

  const assignedCount = assignments.length;
  const submittedCount = assignments.filter(
    (a) => a.status === 'APPROVED' || a.status === 'LATE SUBMITTED'
  ).length;
  const pendingCount = assignedCount - submittedCount;

  return (
    <div className="std-assignments-tab">
      {/* Stat Cards */}
      <div className="ass-stats-cards">
        <div className="ass-card">
          <span className="ass-num">{assignedCount}</span>
          <span className="ass-lbl">Assigned</span>
        </div>
        <div className="ass-card">
          <span className="ass-num green-txt">{submittedCount}</span>
          <span className="ass-lbl">Submitted</span>
        </div>
        <div className="ass-card">
          <span className="ass-num yellow-txt">{pendingCount}</span>
          <span className="ass-lbl">Pending</span>
        </div>
      </div>

      {/* Data Table */}
      <div className="ass-table-card">
        <div className="ass-th">
          <span>Assignment</span>
          <span>Topics</span>
          <span>Due Date</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {assignments.length === 0 && <p className="ass-empty">No assignments yet.</p>}

        {assignments.map((item) => {
          const status = item.status || 'NOT SUBMITTED';
          return (
            <div className="ass-tr" key={item.id}>
              <div className="title-cell" data-label="Assignment">
                <span className="title-text">{item.name}</span>
                {item.tag && <span className="tag-chip">{item.tag}</span>}
              </div>

              <span data-label="Topics">
                {item.topics && item.topics.length > 0
                  ? `${item.topics.length} Topics`
                  : 'No topics'}
              </span>

              <span className="due-date" data-label="Due Date">{item.dueDate}</span>

              <span data-label="Status">
                <span className={`ass-status-chip ${status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {status}
                </span>
              </span>

              <div className="actions-cell" data-label="Action">
                <button className="icon-btn" title="View">👁</button>
                <button className="icon-btn" title="Submit">📤</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentAssignmentsTab;