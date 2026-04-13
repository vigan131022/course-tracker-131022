import { useState, useEffect } from 'react'
import './App.css'

const STUDENT = {
  name: 'Vigan Sadiku',
  id: 'vs131022',
}

const SAMPLE_COURSES = [
  { id: 1, name: 'Client Side Programming', credits: 6, grade: 88, attending: true,  difficulty: 'Moderate' },
  { id: 2, name: 'Data Mining',             credits: 6, grade: 74, attending: true,  difficulty: 'Hard'     },
  { id: 3, name: 'Software Engineering',    credits: 6, grade: 91, attending: true,  difficulty: 'Moderate' },
]

const EMPTY_FORM = { name: '', credits: '', grade: '', attending: true, difficulty: 'Moderate' }

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
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    localStorage.setItem('sct-courses-v3', JSON.stringify(courses))
  }, [courses])

  const totalCredits = courses.reduce((sum, c) => sum + Number(c.credits), 0)

  function handleAdd(e) {
    e.preventDefault()
    const newCourse = {
      id: Date.now(),
      name: form.name.trim(),
      credits: Number(form.credits),
      grade: Number(form.grade),
      attending: form.attending,
      difficulty: form.difficulty,
    }
    setCourses([...courses, newCourse])
    setForm(EMPTY_FORM)
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
          <article key={course.id} className="course-card">
            <div className="card-top">
              <span className={`difficulty-badge difficulty-${course.difficulty.toLowerCase()}`}>
                {course.difficulty}
              </span>
              <button
                className="btn-remove"
                onClick={() => handleRemove(course.id)}
                aria-label={`Remove ${course.name}`}
              >×</button>
            </div>
            <h2 className="course-name">{course.name}</h2>
            <div className="card-footer">
              <span className="course-credits-badge">{course.credits} cr</span>
              <span className="course-grade">Grade: {course.grade}%</span>
              <span className={`attending-badge ${course.attending ? 'attending-yes' : 'attending-no'}`}>
                {course.attending ? 'Attending' : 'Not Attending'}
              </span>
            </div>
          </article>
        ))}
      </main>

      {showForm && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-header">
              <h2 id="modal-title">Add New Course</h2>
              <button className="btn-icon" onClick={() => setShowForm(false)} aria-label="Close">×</button>
            </div>
            <form onSubmit={handleAdd} className="course-form">
              <label className="form-field">
                Course Name
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Data Structures"
                />
              </label>
              <div className="form-row">
                <label className="form-field">
                  Credits
                  <input
                    required
                    type="number"
                    min="1"
                    max="6"
                    value={form.credits}
                    onChange={e => setForm({ ...form, credits: e.target.value })}
                    placeholder="3"
                  />
                </label>
                <label className="form-field">
                  Grade (%)
                  <input
                    required
                    type="number"
                    min="0"
                    max="100"
                    value={form.grade}
                    onChange={e => setForm({ ...form, grade: e.target.value })}
                    placeholder="85"
                  />
                </label>
              </div>
              <div className="form-row">
                <label className="form-field">
                  Difficulty
                  <select
                    value={form.difficulty}
                    onChange={e => setForm({ ...form, difficulty: e.target.value })}
                  >
                    <option>Easy</option>
                    <option>Moderate</option>
                    <option>Hard</option>
                  </select>
                </label>
                <label className="form-field attending-field">
                  Attending
                  <div className="toggle-row">
                    <input
                      type="checkbox"
                      id="attending-toggle"
                      checked={form.attending}
                      onChange={e => setForm({ ...form, attending: e.target.checked })}
                    />
                    <span>{form.attending ? 'Yes' : 'No'}</span>
                  </div>
                </label>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
