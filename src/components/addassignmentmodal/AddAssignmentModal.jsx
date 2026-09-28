import React, { useState } from 'react';
import './addassignmentmodal.css';

const AddAssignmentModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topics, setTopics] = useState('');
  const [dueDate, setDueDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return alert('Title and Due Date required');

    const newAssignment = {
      id: Date.now(),
      name: title,
      description: description || 'No description provided.',
      topics: topics ? topics.split(',').map(t => t.trim()) : [],
      dueDate: dueDate,
      status: 'NOT SUBMITTED'
    };

    onAdd(newAssignment);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>+ Add New Assignment</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>Assignment Title</label>
          <input type="text" placeholder="e.g. React Redux Store Implementation" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <label>Description</label>

```jsx
          <textarea placeholder="Assignment instructions..." value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Topics (comma separated)</label>
          <input type="text" placeholder="React, Redux, Context API" value={topics} onChange={(e) => setTopics(e.target.value)} />

          <label>Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">Create Assignment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssignmentModal;