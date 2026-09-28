// Initial Mock / Dummy Data for Student & Teacher Dashboards

export const initialCourseModules = [
  {
    id: 'mod-1',
    name: 'Web Designing',
    topics: [
      { id: 't1', title: 'HTML5 Basics', completed: true },
      { id: 't2', title: 'CSS3 Flexbox & Grid', completed: true },
      { id: 't3', title: 'Responsive Design', completed: true }
    ]
  },
  {
    id: 'mod-2',
    name: 'Front-End Development',
    topics: [
      { id: 't4', title: 'JavaScript ES6+', completed: true },
      { id: 't5', title: 'DOM Manipulation', completed: true },
      { id: 't6', title: 'Fetch API & Async/Await', completed: false }
    ]
  },
  {
    id: 'mod-3',
    name: 'Modern Front-End Development',
    topics: [
      { id: 't7', title: 'React Basics & JSX', completed: true },
      { id: 't8', title: 'State & Props', completed: true },
      { id: 't9', title: 'Hooks (useState, useEffect)', completed: false }
    ]
  },
  {
    id: 'mod-4',
    name: 'Back-End Development',
    topics: [
      { id: 't10', title: 'Node.js & Express', completed: false },
      { id: 't11', title: 'MongoDB & Mongoose', completed: false }
    ]
  }
];

export const initialAssignments = [
  {
    id: 'ass-1',
    name: 'Student & Teacher Login Portal',
    tag: '',
    topics: ['HTML', 'CSS', 'JavaScript'],
    dueDate: 'September 28, 2026',
    status: 'NOT SUBMITTED'
  },
  {
    id: 'ass-2',
    name: 'Admin panel (E commerce Dashboard)',
    tag: '',
    topics: ['React', 'CSS Modules'],
    dueDate: 'September 10, 2026',
    status: 'LATE SUBMITTED'
  },
  {
    id: 'ass-3',
    name: 'QUICKSERVE WMA (Batch-20)',
    tag: 'HACKATHON',
    topics: [],
    dueDate: 'August 29, 2026',
    status: 'NOT SUBMITTED'
  },
  {
    id: 'ass-4',
    name: 'E-Commerce Website (React js)',
    tag: '',
    topics: ['React', 'Vite', 'CSS'],
    dueDate: 'August 17, 2026',
    status: 'APPROVED'
  },
  {
    id: 'ass-5',
    name: 'Furniture E-Commerce Website',
    tag: '',
    topics: ['HTML', 'CSS', 'JS'],
    dueDate: 'August 10, 2026',
    status: 'LATE SUBMITTED'
  }
];

export const initialQuizzes = [
  {
    id: 'quiz-1',
    title: 'Javascript (Quiz-3)',
    courses: 'Modern Front-End Development',
    questions: 40,
    attempts: '1/3',
    percentage: '78%',
    status: 'PASSED'
  },
  {
    id: 'quiz-2',
    title: 'Javascript (Quiz-2)',
    courses: 'Modern Front-End Development',
    questions: 40,
    attempts: '2/3',
    percentage: '73%',
    status: 'PASSED'
  },
  {
    id: 'quiz-3',
    title: 'Javascript (Quiz-1)',
    courses: 'Modern Front-End Development',
    questions: 40,
    attempts: '1/3',
    percentage: '85%',
    status: 'PASSED'
  },
  {
    id: 'quiz-4',
    title: 'CSS Quiz',
    courses: 'Front-End Development',
    questions: 40,
    attempts: '1/3',
    percentage: '48%',
    status: 'FAILED'
  },
  {
    id: 'quiz-5',
    title: 'HTML Quiz',
    courses: 'Web Designing',
    questions: 40,
    attempts: '1/3',
    percentage: '60%',
    status: 'FAILED'
  }
];

// Helper functions for Local Storage persistence

export const getStoredCourseModules = () => {
  const data = localStorage.getItem('course_modules');
  return data ? JSON.parse(data) : initialCourseModules;
};

export const getStoredAssignments = () => {
  const data = localStorage.getItem('assignments_list');
  return data ? JSON.parse(data) : initialAssignments;
};

export const getStoredQuizzes = () => {
  const data = localStorage.getItem('quizzes_list');
  return data ? JSON.parse(data) : initialQuizzes;
};

export const saveAssignments = (assignments) => {
  localStorage.setItem('assignments_list', JSON.stringify(assignments));
  window.dispatchEvent(new Event('assignments_updated'));
};

export const saveCourseModules = (modules) => {
  localStorage.setItem('course_modules', JSON.stringify(modules));
  window.dispatchEvent(new Event('assignments_updated'));
};