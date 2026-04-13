import './StudentCard.css'

function StudentCard({ course, onRemove }) {
  const atRisk = course.grade < 50 && course.attending === false
  const eligibleForDistinction = course.grade >= 85

  return (
    <article className="course-card">
      <div className="card-top">
        <span className={`difficulty-badge difficulty-${course.difficulty.toLowerCase()}`}>
          {course.difficulty}
        </span>
        <button
          className="btn-remove"
          onClick={() => onRemove(course.id)}
          aria-label={`Remove ${course.name}`}
        >×</button>
      </div>

      <h2 className="course-name">{course.name}</h2>

      {(atRisk || eligibleForDistinction) && (
        <div className="indicators">
          {atRisk && (
            <span className="indicator indicator-risk">At Risk</span>
          )}
          {eligibleForDistinction && (
            <span className="indicator indicator-distinction">Eligible for Distinction</span>
          )}
        </div>
      )}

      <div className="card-footer">
        <span className="course-credits-badge">{course.credits} cr</span>
        <span className="course-grade">Grade: {course.grade}%</span>
        <span className={`attending-badge ${course.attending ? 'attending-yes' : 'attending-no'}`}>
          {course.attending ? 'Attending' : 'Not Attending'}
        </span>
      </div>
    </article>
  )
}

export default StudentCard
