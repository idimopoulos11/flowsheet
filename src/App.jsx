import { useState } from 'react'
import CoursePlanCard from './CoursePlanCard'
import './App.css'

// Our list of student course plans (will come from Supabase later)
const students = [
  {
    id: 1,
    studentName: "Iliana Dimopoulos",
    year: "Sophomore",
    track: "Standard ChemE",
    note: "Loving Transport so far! Highly recommend taking Thermo before Reactor Design."
  },
  {
    id: 2,
    studentName: "Marcus Chen",
    year: "Junior",
    track: "Biomolecular",
    note: "Studied abroad in Madrid spring of sophomore year — Vandy gave credit for two ChemE electives. DM me if you're considering it!"
  },
  {
    id: 3,
    studentName: "Priya Patel",
    year: "Senior",
    track: "Standard ChemE + Math minor",
    note: "If you want the math minor, knock out Linear Algebra freshman spring. Trust me, scheduling it later is a nightmare."
  },
  {
    id: 4,
    studentName: "Jordan Williams",
    year: "Freshman",
    track: "Undecided (leaning Standard ChemE)",
    note: "Just started! Anyone have advice on which professor to take for Mass & Energy Balances?"
  }
]

const yearRank = {
  "Freshman": 1,
  "Sophomore": 2,
  "Junior": 3,
  "Senior": 4
}

function App() {
  const [sortBy, setSortBy] = useState("default")
  const [searchText, setSearchText] = useState("")

  const filteredStudents = students.filter((student) => {
    const search = searchText.toLowerCase()
    return (
      student.studentName.toLowerCase().includes(search) ||
      student.track.toLowerCase().includes(search)
    )
  })

  const visibleStudents = filteredStudents.slice().sort((a, b) => {
    if (sortBy === "year") {
      return yearRank[a.year] - yearRank[b.year]
    }
    if (sortBy === "name") {
      return a.studentName.localeCompare(b.studentName)
    }
    return 0
  })

  return (
    <div className="app">

      <header className="header">
        <h1>Flowsheet</h1>
        <p className="tagline">ChemE course plans, shared by students like you.</p>
      </header>

      <main className="main">
        <div className="main-header">
          <h2>Browse Course Plans</h2>

          <div className="sort-control">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="year">Year</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <input
          type="text"
          className="search-bar"
          placeholder="Search by name or track..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <p className="results-count">
          Showing {visibleStudents.length} of {students.length} plans
        </p>

        {visibleStudents.length === 0 ? (
          <p className="no-results">No plans match your search. Try a different term!</p>
        ) : (
          visibleStudents.map((student) => (
            <CoursePlanCard
              key={student.id}
              studentName={student.studentName}
              year={student.year}
              track={student.track}
              note={student.note}
            />
          ))
        )}

      </main>

    </div>
  )
}

export default App