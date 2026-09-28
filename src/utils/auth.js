const STUDENTS_KEY = 'smit_students';
const CURRENT_USER_KEY = 'smit_current_user';

export const TEACHERS_DEMO = [
  {
    email: 'teacher@smit.com',
    password: '123456',
    name: 'SMIT Instructor'
  }
];

// Get stored students
export const getStudents = () => {
  const data = localStorage.getItem(STUDENTS_KEY);
  return data ? JSON.parse(data) : [];
};

// Save a new student
export const saveStudent = (studentData) => {
  const students = getStudents();
  students.push(studentData);
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
};

// Check if student exists by CNIC
export const findStudentByCNIC = (cnic) => {
  const students = getStudents();
  return students.find((s) => s.cnic === cnic);
};

// Authenticate Student
export const authenticateStudent = (cnic, password) => {
  const student = findStudentByCNIC(cnic);
  if (student && student.password === password) {
    return { success: true, user: { ...student, role: 'student' } };
  }
  return { success: false, message: 'Invalid CNIC or Password.' };
};

// Authenticate Teacher
export const authenticateTeacher = (email, password) => {
  const teacher = TEACHERS_DEMO.find(
    (t) => t.email.toLowerCase() === email.toLowerCase() && t.password === password
  );
  if (teacher) {
    return { success: true, user: { ...teacher, role: 'teacher' } };
  }
  return { success: false, message: 'Invalid Teacher Credentials.' };
};

// Session Management
export const setCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const getCurrentUser = () => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};