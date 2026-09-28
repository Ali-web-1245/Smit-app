import React, { useState, useEffect } from 'react';
import { getStoredQuizzes } from '../../../utils/dummy';
import './studentquiztab.css';

const StudentQuizTab = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setQuizzes(getStoredQuizzes() || []);

    const handleSync = () => setQuizzes(getStoredQuizzes() || []);
    window.addEventListener('assignments_updated', handleSync);
    return () => window.removeEventListener('assignments_updated', handleSync);
  }, []);

  return (
    <div className="std-quiz-tab">
      <div className="quiz-breadcrumb">
        Home &gt; Modern Front-End Development &gt; <span className="active-path">Quiz</span>
      </div>

      {/* Info Warning Box */}
      <div className="info-alert-box">
        <h4>⚠️ Important Information</h4>
        <ul>
          <li>Once started, quizzes must be completed in one session</li>
          <li>Switching tabs or leaving the window will be recorded</li>
          <li>Ensure you have a stable internet connection</li>
          <li>The quiz will open in fullscreen mode</li>
        </ul>
      </div>

      {/* Quizzes Table */}
      <div className="quiz-table-card">
        <div className="quiz-table-header">
          <span>Title</span>
          <span>Module / Course</span>
          <span>Questions</span>
          <span>Attempts</span>
          <span>Percentage</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {quizzes.length > 0 ? (
          quizzes.map((quiz) => {
            const status = quiz.status || '';
            return (
              <div className="quiz-table-row" key={quiz.id}>
                <span className="quiz-title" data-label="Title">{quiz.title}</span>
                <span className="quiz-module" data-label="Module / Course">{quiz.courses}</span>
                <span data-label="Questions">{quiz.questions ?? '-'}</span>
                <span data-label="Attempts">
                  <span className="attempts-pill">{quiz.attempts ?? '-'}</span>
                </span>
                <span className="score-text" data-label="Percentage">{quiz.percentage ?? '-'}</span>
                <span data-label="Status">
                  <span className={`quiz-status ${status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {status || '-'}
                  </span>
                </span>
                <div className="quiz-action-cell" data-label="Action">
                  <button className="completed-btn" disabled>
                    Completed
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-data-msg">No quizzes available right now.</div>
        )}
      </div>

      <p className="instructor-note">
        Contact your instructor if you have any issues accessing your quizzes.
      </p>
    </div>
  );
};

export default StudentQuizTab;