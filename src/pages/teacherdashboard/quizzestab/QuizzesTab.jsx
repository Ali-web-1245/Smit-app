import React, { useState, useEffect } from 'react';
import { getStoredQuizzes, saveQuiz, deleteQuiz } from '../../../utils/sharedStore';
import './quizeztab.css';

const QuizzesTab = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('Modern Web Application Development');
  const [date, setDate] = useState('');

  useEffect(() => {
    setQuizzes(getStoredQuizzes());
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title || !date) return alert('Please enter title and date');

    const newQuiz = {
      id: Date.now(),
      title,
      courses: course,
      date,
      expiry: date,
      status: 'ACTIVE'
    };

    const updated = saveQuiz(newQuiz);
    setQuizzes(updated);
    setTitle('');
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this quiz?')) {
      const updated = deleteQuiz(id);
      setQuizzes(updated);
    }
  };

  
  return (
  <div className="quiz-tab">
    <div className="assignments-top-bar">
      <button className="new-assignment-btn" onClick={() => setIsModalOpen(true)}>
        + Create New Quiz
      </button>
    </div>

    <div className="data-table-card">
      <div className="quiz-t-header">
        <span>Quiz Title</span>
        <span>Course(s)</span>
        <span>Date</span>
        <span>Status</span>
        <span>Action</span>
      </div>

      {quizzes.length === 0 && <p className="quiz-empty">No quizzes yet.</p>}

      {quizzes.map((quiz) => (
        <div className="quiz-t-row" key={quiz.id}>
          <span className="quiz-t-title" data-label="Quiz Title">{quiz.title}</span>
          <span className="quiz-t-course" data-label="Course(s)">{quiz.courses}</span>
          <span data-label="Date">{quiz.date}</span>
          <span data-label="Status"><span className="active-chip">{quiz.status}</span></span>
          <div className="quiz-actions" data-label="Action">
            <button className="del-btn" onClick={() => handleDelete(quiz.id)}>🗑 Delete</button>
          </div>
        </div>
      ))}
    </div>

    {isModalOpen && (
      <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <h3>+ Create Quiz</h3>
          <form onSubmit={handleCreate} className="modal-form">
            <label>Quiz Title</label>
            <input type="text" placeholder="e.g. React hooks quiz" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" className="submit-btn">Create</button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
};

export default QuizzesTab;