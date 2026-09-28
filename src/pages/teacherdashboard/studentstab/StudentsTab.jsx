import React, { useState, useEffect } from 'react';
import { fetchApiStudents } from '../../../utils/sharedStore';
import './studentstab.css';

const StudentsTab = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);
      const data = await fetchApiStudents();
      setStudents(data || []);
      setLoading(false);
    };
    loadStudents();
  }, []);

  const term = searchTerm.toLowerCase();
  const filtered = students.filter(
    (s) =>
      (s.name || '').toLowerCase().includes(term) ||
      (s.email || '').toLowerCase().includes(term) ||
      String(s.roll || '').includes(searchTerm)
  );

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentDisplayed = filtered.slice(startIndex, startIndex + pageSize);

  const showingFrom = filtered.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + pageSize, filtered.length);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="students-tab">
      <div className="tab-top-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, email or roll no..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="data-table-card">
        <div className="table-header">
          <span>Name</span>
          <span>Roll Number</span>
          <span>Email</span>
          <span>Status</span>
        </div>

        {loading ? (
          <div className="no-data">Loading dynamic student API data...</div>
        ) : currentDisplayed.length > 0 ? (
          currentDisplayed.map((std) => (
            <div className="table-row" key={std.roll}>
              <div className="std-name-cell" data-label="Name">
                <div className="std-avatar">{(std.name || '?').charAt(0)}</div>
                <span className="std-name-text">{std.name}</span>
              </div>
              <span className="std-roll" data-label="Roll Number">{std.roll}</span>
              <span className="email-text" data-label="Email">{std.email}</span>
              <span data-label="Status">
                <span className="enrolled-chip">{std.status}</span>
              </span>
            </div>
          ))
        ) : (
          <div className="no-data">No students found</div>
        )}

        <div className="table-footer">
          <span className="footer-info">
            Showing {showingFrom}-{showingTo} of {filtered.length} students
          </span>
          <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>&lt; Previous</button>
            <span className="page-indicator">Page {currentPage} of {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>Next &gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsTab;