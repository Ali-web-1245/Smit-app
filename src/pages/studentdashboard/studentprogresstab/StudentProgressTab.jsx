import React, { useState, useEffect } from 'react';
import { getStoredCourseModules } from '../../../utils/dummy';
import './studentprogresstab.css';

const StudentProgressTab = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    setModules(getStoredCourseModules() || []);
  }, []);

  let totalTopics = 0;
  let completedTopics = 0;

  modules.forEach((m) => {
    (m.topics || []).forEach((t) => {
      totalTopics++;
      if (t.completed) completedTopics++;
    });
  });

  const pendingTopics = totalTopics - completedTopics;

  return (
    <div className="std-progress-tab">
      {/* KPI Section */}
      <div className="progress-kpi-cards">
        <div className="p-card">
          <span className="p-num">{totalTopics}</span>
          <span className="p-lbl">Total Topics</span>
        </div>
        <div className="p-card">
          <span className="p-num green-txt">{completedTopics}</span>
          <span className="p-lbl">Completed Topics</span>
        </div>
        <div className="p-card">
          <span className="p-num yellow-txt">{pendingTopics}</span>
          <span className="p-lbl">Pending Topics</span>
        </div>
      </div>

      {/* Course Modules List */}
      <div className="modules-status-wrapper">
        {modules.length === 0 && <p className="p-empty">No modules yet.</p>}

        {modules.map((m) => {
          const topics = m.topics || [];
          const done = topics.filter((t) => t.completed).length;
          const total = topics.length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          const color = pct === 100 ? '#22c55e' : '#2563eb';

          return (
            <div className="mod-row-card" key={m.id}>
              <div className="mod-info">
                <span className="mod-icon">{pct === 100 ? '✅' : '🕒'}</span>
                <div className="mod-text">
                  <h4 className="mod-name">{m.name}</h4>
                  <span className="mod-sub">Topics: {done}/{total}</span>
                </div>
              </div>

              <div className="pct-circle" style={{ borderColor: color, color: color }}>
                {pct}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentProgressTab;