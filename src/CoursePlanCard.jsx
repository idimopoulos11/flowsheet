function CoursePlanCard(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{props.studentName}</h3>
        <span className={`badge badge-${props.year.toLowerCase()}`}>
          {props.year}
        </span>
      </div>
      <p>Track: {props.track}</p>
      <p>{props.note}</p>
    </div>
  )
}

export default CoursePlanCard