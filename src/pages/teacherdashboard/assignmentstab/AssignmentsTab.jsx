import React, { useState, useEffect } from 'react';
import AddAssignmentModal from '../../../components/addassignmentmodal/AddAssignmentModal';
import { getStoredAssignments, saveAssignment, updateAssignmentStatus } from '../../../utils/sharedStore';
import './assignmentstab.css';

const AssignmentsTab = () => {
  const [assignments, setAssignments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setAssignments(getStoredAssignments() || []);

    const handleSync = () => setAssignments(getStoredAssignments() || []);
    window.addEventListener('assignments_updated', handleSync);
    return () => window.removeEventListener('assignments_updated', handleSync);
  }, []);

  const handleAddAssignment = (newAss) => {
    const updated = saveAssignment(newAss);
    setAssignments(updated || []);
  };

  const handleApprove = (id) => {
    const updated = updateAssignmentStatus(id, 'APPROVED');
    setAssignments(updated || []);
  };

  return (
    <div className="assignments-tab">
      <div className="assignments-top-bar">
        <button className="new-assignment-btn" onClick={() => setIsModalOpen(true)}>
          + New Assignment
        </button>
      </div>

      <div className="data-table-card">
        <div className="ass-teacher-header">
          <span>Title</span>
          <span>Description</span>
          <span>Topics</span>
          <span>Due Date</span>
          <span>Actions</span>
        </div>

        {assignments.length === 0 && <p className="ass-empty">No assignments yet.</p>}

        {assignments.map((item) => (
          <div className="ass-teacher-row" key={item.id}>
            <div className="ass-title-block" data-label="Title">
              <span className="ass-name">{item.name}</span>
              {item.tag && <span className="hackathon-tag">{item.tag}</span>}
            </div>

            <span className="ass-desc" data-label="Description">{item.description}</span>

            <div className="topics-chips-cell" data-label="Topics">
              {item.topics && item.topics.length > 0 ? (
                item.topics.map((t, i) => (
                  <span key={i} className="t-chip">{t}</span>
                ))
              ) : (
                <span className="no-topic">No topics</span>
              )}
            </div>

            <span className="due-date-text" data-label="Due Date">{item.dueDate}</span>

            <div className="actions-cell" data-label="Actions">
              {item.status !== 'APPROVED' ? (
                <button className="approve-action-btn" onClick={() => handleApprove(item.id)}>
                  Approve
                </button>
              ) : (
                <span className="approved-label">✓ Approved</span>
              )}
              <span className="eye-icon">👁</span>
              <span className="edit-icon">✏️</span>
            </div>
          </div>
        ))}
      </div>

      <AddAssignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddAssignment}
      />
    </div>
  );
};

export default AssignmentsTab;