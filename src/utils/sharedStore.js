const ASSIGNMENTS_KEY = 'smit_app_assignments';
const QUIZZES_KEY = 'smit_app_quizzes';
const PROGRESS_KEY = 'smit_app_course_progress';

// Initial Data
const defaultAssignments = [
    { id: 1, name: 'Admin panel (E commerce Dashboard)', topics: ['NextJS', 'ReactJS Introduction'], dueDate: '2026-09-10', status: 'LATE SUBMITTED', description: 'Create the provided UI design in React or Next.js' },
    { id: 2, name: 'QUICKSERVE WMA (Batch-20)', topics: [], dueDate: '2026-08-30', status: 'NOT SUBMITTED', tag: 'HACKATHON', description: 'Challenge: Build a modern service-booking web application' },
    { id: 3, name: 'E-Commerce Website (React js)', topics: ['ReactJS Introduction', 'Components, Props'], dueDate: 'Aug 17, 2026', status: 'APPROVED', description: 'React.js frontend create all required e-commerce features' },
    { id: 4, name: 'Furniture E-Commerce Website', topics: ['JavaScript Book Code', 'Github'], dueDate: 'Aug 10, 2026', status: 'LATE SUBMITTED', description: 'Follow the Figma design' }];

const defaultQuizzes = [
    { id: 1, title: 'Javascript (Quiz-4)', courses: 'Modern Web Application Development', date: '2026-06-24', expiry: '2026-06-24', status: 'ACTIVE' },
    { id: 2, title: 'Javascript (Quiz-3)', courses: 'Modern Web Application Development', date: '2026-06-03', expiry: '2026-06-03', status: 'ACTIVE' }
];

const defaultCourseModules = [
    {
        id: 'mod-1',
        name: 'Web Designing',
        topics: [
            { id: 't1', title: 'HTML5 Semantic Tags', completed: true },
            { id: 't2', title: 'CSS3 Flexbox & Grid Layouts', completed: true },
            { id: 't3', title: 'Responsive UI Design Principles', completed: true }
        ]
    },
    {
        id: 'mod-2',
        name: 'Front-End Development',
        topics: [
            { id: 't4', title: 'JavaScript Fundamentals & ES6+', completed: true },
            { id: 't5', title: 'DOM Manipulation & Events', completed: true },
            { id: 't6', title: 'ReactJS Components & Props', completed: true },
            { id: 't7', title: 'React Hooks (useState, useEffect)', completed: false },
            { id: 't8', title: 'State Management with Redux Toolkit', completed: false }
        ]
    },
    {
        id: 'mod-3',
        name: 'Modern Front-End Development',
        topics: [
            { id: 't9', title: 'Next.js App Router Architecture', completed: false },
            { id: 't10', title: 'Tailwind CSS Integration', completed: false },
            { id: 't11', title: 'REST API Integration with Axios', completed: false }
        ]
    }
];

// External API Fetcher for 100+ Students
export const fetchApiStudents = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        // Replicating list to make dynamic pagination dataset
        const multiplied = [];
        for (let i = 0; i < 10; i++) {
            data.forEach((user) => {
                multiplied.push({
                    roll: `${407500 + multiplied.length + 1}`,
                    name: `${user.name} ${i > 0 ? `(${i + 1})` : ''}`,
                    email: user.email.toLowerCase(),
                    status: 'ENROLLED'
                });
            });
        }
        return multiplied;
    } catch (error) {
        console.error('Failed to fetch API students', error);
        return [];
    }
};

// LocalStorage Helper Getters & Setters
export const getStoredAssignments = () => {
    const data = localStorage.getItem(ASSIGNMENTS_KEY);
    if (!data) {
        localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(defaultAssignments));
        return defaultAssignments;
    }
    return JSON.parse(data);
};

export const saveAssignment = (newAssignment) => {
    const current = getStoredAssignments();
    const updated = [newAssignment, ...current];
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('assignments_updated'));
    return updated;
};

export const updateAssignmentStatus = (id, newStatus) => {
    const current = getStoredAssignments();
    const updated = current.map(item => item.id === id ? { ...item, status: newStatus } : item);
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('assignments_updated'));
    return updated;
};

export const getStoredQuizzes = () => {
    const data = localStorage.getItem(QUIZZES_KEY);
    if (!data) {
        localStorage.setItem(QUIZZES_KEY, JSON.stringify(defaultQuizzes));
        return defaultQuizzes;
    }
    return JSON.parse(data);
};

export const saveQuiz = (newQuiz) => {
    const current = getStoredQuizzes();
    const updated = [newQuiz, ...current];
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(updated));
    return updated;
};

export const deleteQuiz = (id) => {
    const current = getStoredQuizzes();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(updated));
    return updated;
};

export const getStoredCourseModules = () => {
    const data = localStorage.getItem(PROGRESS_KEY);
    if (!data) {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(defaultCourseModules));
        return defaultCourseModules;
    }
    return JSON.parse(data);
};

export const toggleTopicStatus = (moduleId, topicId) => {
    const current = getStoredCourseModules();
    const updated = current.map(mod => {
        if (mod.id === moduleId) {
            return {
                ...mod,
                topics: mod.topics.map(t => t.id === topicId ? { ...t, completed: !t.completed } : t)
            };
        }
        return mod;
    });
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
    return updated;
};