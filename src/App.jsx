import { useState, useEffect } from 'react'
import './App.css'
import StudentCard from './StudentCard'
import RegisterCourse from './RegisterCourse'

const STUDENT = {
  name: 'Vigan Sadiku',
  id: 'vs131022',
}

const SAMPLE_COURSES = [
  { id: 1, name: 'Client Side Programming', credits: 6, grade: 88, attending: true,  difficulty: 'Moderate' },
  { id: 2, name: 'Data Mining',             credits: 6, grade: 74, attending: true,  difficulty: 'Hard'     },
  { id: 3, name: 'Software Engineering',    credits: 6, grade: 91, attending: true,  difficulty: 'Moderate' },
]

function App() {
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('sct-courses-v3')
      return saved ? JSON.parse(saved) : SAMPLE_COURSES
    } catch {
      return SAMPLE_COURSES
    }
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    localStorage.setItem('sct-courses-v3', JSON.stringify(courses))
  }, [courses])

  const totalCredits = courses.reduce((sum, c) => sum + Number(c.credits), 0)

  function handleRegister(courseData) {
    setCourses([...courses, { id: Date.now(), ...courseData }])
    setShowForm(false)
  }

  function handleRemove(id) {
    setCourses(courses.filter(c => c.id !== id))
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) setShowForm(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <div className="header-text">
            <h1 className="app-title">Course Tracker</h1>
            <p className="app-subtitle">Spring 2026</p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            + Add Course
          </button>
        </div>
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-value">{courses.length}</span>
            <span className="stat-label">Enrolled</span>
          </div>
          <div className="stat-sep" />
          <div className="stat">
            <span className="stat-value">{totalCredits}</span>
            <span className="stat-label">Credits</span>
          </div>
        </div>
      </header>

      <section className="student-info">
        <div className="student-details">
          <span className="student-name">{STUDENT.name}</span>
          <span className="student-id">ID: {STUDENT.id}</span>
        </div>
        <p className="student-caption">Enrolled courses for the Spring 2026 semester</p>
      </section>

      <main className="courses-grid">
        {courses.length === 0 && (
          <div className="empty-state">
            <p>No courses yet.</p>
            <button className="btn-primary" onClick={() => setShowForm(true)}>Add your first course</button>
          </div>
        )}
        {courses.map(course => (
          <StudentCard key={course.id} course={course} onRemove={handleRemove} />
        ))}
      </main>

      {showForm && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-header">
              <h2 id="modal-title">Register Course</h2>
              <button className="btn-icon" onClick={() => setShowForm(false)} aria-label="Close">×</button>
            </div>
            <RegisterCourse onRegister={handleRegister} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
