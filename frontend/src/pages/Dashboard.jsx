
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001'

const dashboardLinks = [
  { icon: '👤', title: 'My Profile', description: 'Update your student details', path: '/profile' },
  { icon: '💼', title: 'Jobs & Internships', description: 'Explore career opportunities', path: '/jobs' },
  { icon: '📚', title: 'Learn & Prepare', description: 'Build skills and practise', path: '/learn' },
  { icon: '📝', title: 'Study Materials', description: 'Browse subject resources', path: '/study-materials' },
  { icon: '🎯', title: 'Placement Preparation', description: 'Prepare for interviews', path: '/placements' },
  { icon: '🚀', title: 'Projects & Hackathons', description: 'Build your portfolio', path: '/projects' },
  { icon: '📄', title: 'Resume Builder', description: 'Organize your qualifications', path: '/resume-builder' },
  { icon: '💡', title: 'Career Guidance', description: 'Explore career paths', path: '/career-guidance' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    fetch(`${API}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Unable to load profile')
        setStudent(data.user)
      })
      .catch((error) => {
        console.error('Dashboard error:', error)
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
      })
      .finally(() => setLoading(false))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login', { replace: true })
  }

  if (loading) {
    return <main style={{ maxWidth: 1000, margin: '60px auto', padding: 24 }}>Loading your dashboard...</main>
  }

  if (!student) return null

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: 24, color: '#251b3a' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
        <Link to="/" style={{ color: '#7047eb', textDecoration: 'none', fontWeight: 700 }}>
          Campus<span style={{ color: '#9b76f5' }}>Connect</span>
        </Link>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/" style={{ padding: '10px 14px', border: '1px solid #ddd', borderRadius: 10, textDecoration: 'none' }}>Home</Link>
          <button onClick={handleLogout} style={{ padding: '10px 14px', border: 0, borderRadius: 10, background: '#7047eb', color: '#fff', cursor: 'pointer' }}>Logout</button>
        </div>
      </header>

      <section style={{ padding: 30, borderRadius: 22, background: 'linear-gradient(120deg,#f1ebff,#faf8ff)', marginBottom: 34 }}>
        <p style={{ color: '#7047eb', fontWeight: 700, letterSpacing: 1 }}>YOUR STUDENT SPACE</p>
        <h1 style={{ fontSize: 'clamp(28px,5vw,42px)', margin: '12px 0' }}>Welcome back, {student.name}! 👋</h1>
        <p style={{ color: '#6f687e', lineHeight: 1.7 }}>Keep learning, explore opportunities and build your future.</p>
        <Link to="/profile" style={{ display: 'inline-block', marginTop: 12, padding: '12px 18px', background: '#7047eb', color: '#fff', borderRadius: 10, textDecoration: 'none' }}>View or Edit Profile →</Link>
      </section>

      <section>
        <h2>Your Dashboard</h2>
        <p style={{ color: '#6f687e' }}>Everything you need for your student journey, in one place.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18, marginTop: 24 }}>
          {dashboardLinks.map((item) => (
            <Link key={item.path} to={item.path} style={{ padding: 22, border: '1px solid #e7e2f0', borderRadius: 16, color: 'inherit', textDecoration: 'none', background: '#fff' }}>
              <span style={{ fontSize: 30 }}>{item.icon}</span>
              <h3>{item.title}</h3>
              <p style={{ color: '#6f687e', lineHeight: 1.6 }}>{item.description}</p>
              <span style={{ color: '#7047eb', fontWeight: 700 }}>Open →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
