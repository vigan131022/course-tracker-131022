import { useState, useRef, useEffect } from 'react'
import './RegisterCourse.css'

const EMPTY = { name: '', credits: '', grade: '', attending: true, difficulty: 'Moderate' }

function RegisterCourse({ onRegister }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const nameInputRef = useRef(null)

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  function validate() {
    const errs = {}
    if (!form.name.trim()) {
      errs.name = 'Course name cannot be empty.'
    }
    const g = Number(form.grade)
    if (form.grade === '' || isNaN(g) || g < 5 || g > 10) {
      errs.grade = 'Grade must be a number from 5 to 10.'
    }
    return errs
  }

  function field(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
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
        <input
          type="number"
          min="1"
          max="12"
          value={form.credits}
          onChange={e => field('credits', e.target.value)}
          placeholder="6"
        />
      </label>

      <label className="form-field">
        Current Grade
        <input
          type="number"
          value={form.grade}
          onChange={e => field('grade', e.target.value)}
          placeholder="5 – 10"
          className={errors.grade ? 'input-error' : ''}
        />
        {errors.grade && <span className="field-error">{errors.grade}</span>}
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
