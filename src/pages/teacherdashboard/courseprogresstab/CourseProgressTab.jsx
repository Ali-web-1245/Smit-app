import React, { useState, useEffect } from 'react';
import { getStoredCourseModules, toggleTopicStatus } from '../../../utils/sharedStore';
import './courseprogresstab.css';

const CourseProgressTab = () => {
  const [modules, setModules] = useState([]);
  const [expandedMod, setExpandedMod] = useState(null);

  useEffect(() => {
    setModules(getStoredCourseModules() || []);
  }, []);

  const handleToggleTopic = (modId, topicId) => {
    const updated = toggleTopicStatus(modId, topicId);
    setModules(updated || []);
  };

  // Overall progress calculation
  let totalTopics = 0;
  let completedTopics = 0;

  modules.forEach((m) => {
    (m.topics || []).forEach((t) => {
      totalTopics++;
      if (t.completed) completedTopics++;
    });
  });

  const overallPercent =
    totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div className="progress-tab">
      <div className="progress-card-wrapper">
        <div className="progress-top-head">
          <div>
            <span className="sub-lbl">MY PROGRESS</span>
            <h3>S Muzammil Javed - Dynamic Course Tracker</h3>
          </div>
          <span className="topics-count">
            Topics Completed: {completedTopics}/{totalTopics}
          </span>
        </div>

        <div className="overall-bar-section">
          <span>Overall progress</span>
          <span className="percent-val">{overallPercent}%</span>
        </div>
        <div className="bar-bg">
          <div className="bar-fill" style={{ width: `${overallPercent}%` }}></div>
        </div>

        <div className="modules-list">
          {modules.map((m) => {
            const topics = m.topics || [];
            const mCompleted = topics.filter((t) => t.completed).length;
            const mTotal = topics.length;
            const mPercent = mTotal > 0 ? Math.round((mCompleted / mTotal) * 100) : 0;
            const isExpanded = expandedMod === m.id;
            const color = mPercent === 100 ? '#16a34a' : '#2563eb';

            return (
              <div className="module-accordion" key={m.id}>
                <div
                  className="module-item"
                  onClick={() => setExpandedMod(isExpanded ? null : m.id)}
                >
                  <div>
                    <span className="mod-title">
                      {m.name} {isExpanded ? '▲' : '▼'}
                    </span>
                    <span className="mod-topics">
                      Topics: {mCompleted}/{mTotal} completed
                    </span>
                  </div>
                  <div
                    className="mod-percent-circle"
                    style={{ borderColor: color, color: color }}
                  >
                    {mPercent}%
                  </div>
                </div>

                {isExpanded && (
                  <div className="topics-expandable-list">
                    {topics.map((t) => (
                      <label className="topic-checkbox-row" key={t.id}>
                        <input
                          type="checkbox"
                          checked={!!t.completed}
                          onChange={() => handleToggleTopic(m.id, t.id)}
                        />
                        <span className={t.completed ? 'completed-text' : ''}>
                          {t.title}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseProgressTab;