import { useState, useEffect, useCallback } from 'react'
import './App.css'
import StudentCard from './components/StudentCard'
import RegisterCourse from './components/RegisterCourse'

const STUDENT = {
  name: 'Vigan Sadiku',
  id: 'vs131022',
}

const SAMPLE_COURSES = [
  { id: 1, name: 'Client Side Programming', credits: 6, grade: 8, attending: true,  difficulty: 'Moderate' },
  { id: 2, name: 'Data Mining',             credits: 6, grade: 7, attending: true,  difficulty: 'Hard'     },
  { id: 3, name: 'Software Engineering',    credits: 6, grade: 9, attending: true,  difficulty: 'Moderate' },
]

function App() {
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('sct-courses-v4')
      return saved ? JSON.parse(saved) : SAMPLE_COURSES
    } catch {
      return SAMPLE_COURSES
    }
  })

  useEffect(() => {
    localStorage.setItem('sct-courses-v4', JSON.stringify(courses))
  }, [courses])

  const totalCredits = courses.reduce((sum, c) => sum + Number(c.credits), 0)

  function handleRegister(courseData) {
    setCourses(prev => [...prev, { id: Date.now(), ...courseData }])
  }

  // Using the functional updater form of setCourses means this callback never
  // needs to read the courses variable directly, so the dependency array stays
  // empty and the function reference is stable across renders. That stability
  // is what lets React.memo on StudentCard actually skip re-renders — if this
  // were a plain function, every parent render would hand every card a new
  // prop reference and memo would never help.
  const handleRemove = useCallback((id) => {
    setCourses(prev => prev.filter(c => c.id !== id))
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-text">
          <h1 className="app-title">Course Tracker</h1>
          <p className="app-subtitle">Spring 2026</p>
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

      <div className="content-layout">
        <main className="courses-section">
          {courses.length === 0 && (
            <p className="empty-state">No courses registered yet.</p>
          )}
          <div className="courses-grid">
            {courses.map(course => (
              <StudentCard key={course.id} course={course} onRemove={handleRemove} />
            ))}
          </div>
        </main>

        <aside className="register-aside">
          <h2 className="register-title">Register Course</h2>
          <RegisterCourse onRegister={handleRegister} />
        </aside>
      </div>
    </div>
  )
}

export default App
