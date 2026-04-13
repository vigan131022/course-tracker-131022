import { useState, useRef, useEffect } from 'react'
import './RegisterCourse.css'

const EMPTY = { name: '', credits: 3, grade: 5, attending: true, difficulty: 'Moderate' }

function RegisterCourse({ onRegister }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const nameInputRef = useRef(null)

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  function field(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) {
      setErrors({ name: 'Course name cannot be empty.' })
      return
    }
    onRegister({
      name: form.name.trim(),
      credits: Number(form.credits),
      grade: Number(form.grade),
      attending: form.attending,
      difficulty: form.difficulty,
    })
    setForm(EMPTY)
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="register-form" noValidate>

      <label className="form-field">
        Course Name
        <input
          ref={nameInputRef}
          type="text"
          value={form.name}
          onChange={e => field('name', e.target.value)}
          placeholder="e.g. Software Engineering"
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>

      <label className="form-field">
        Credit Hours
        <select value={form.credits} onChange={e => field('credits', e.target.value)}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </label>

      <label className="form-field">
        Current Grade
        <select value={form.grade} onChange={e => field('grade', e.target.value)}>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </label>

      <label className="form-field attending-field">
        Attending Regularly
        <div className="toggle-row">
          <input
            type="checkbox"
            checked={form.attending}
            onChange={e => field('attending', e.target.checked)}
          />
          <span>{form.attending ? 'Yes' : 'No'}</span>
        </div>
      </label>

      <label className="form-field">
        Difficulty
        <select
          value={form.difficulty}
          onChange={e => field('difficulty', e.target.value)}
        >
          <option>Easy</option>
          <option>Moderate</option>
          <option>Hard</option>
        </select>
      </label>

      <div className="form-actions">
        <button type="submit" className="btn-primary">Register</button>
      </div>

    </form>
  )
}

export default RegisterCourse
