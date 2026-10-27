
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function Profile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    college: '',
    branch: '',
    year: '',
    skills: '',
    interests: '',
    bio: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    fetch(`${API}/api/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Could not load profile')
        const user = data.user
        setProfile({
          name: user.name || '',
          email: user.email || '',
          college: user.college || '',
          branch: user.branch || '',
          year: user.year || '',
          skills: (user.skills || []).join(', '),
          interests: (user.interests || []).join(', '),
          bio: user.bio || '',
        })
      })
      .catch((err) => {
        alert(err.message)
        localStorage.removeItem('token')
        navigate('/login', { replace: true })
      })
      .finally(() => setLoading(false))
  }, [navigate])

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    setSaving(true)

    try {
      const res = await fetch(`${API}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...profile,
          skills: profile.skills.split(',').map(s => s.trim()).filter(Boolean),
          interests: profile.interests.split(',').map(s => s.trim()).filter(Boolean),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Profile save failed')

      alert('Profile saved successfully! 🎉')
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <main className="profile-page"><p>Loading profile...</p></main>

  return (
    <main className="profile-page" style={{ maxWidth: 720, margin: '40px auto', padding: 24 }}>
      <Link to="/">← Campus Connect</Link>
      <h1>Build Your Student Profile 🎓</h1>
      <p>Your details are private to your account.</p>

      <form onSubmit={handleSave} style={{ display: 'grid', gap: 14 }}>
        <label>Full Name<input name="name" value={profile.name} onChange={handleChange} required /></label>
        <label>Email<input value={profile.email} readOnly /></label>
        <label>College<input name="college" value={profile.college} onChange={handleChange} /></label>
        <label>Branch<input name="branch" value={profile.branch} onChange={handleChange} placeholder="e.g. CSE" /></label>
        <label>Year of Study<input name="year" value={profile.year} onChange={handleChange} placeholder="e.g. 3rd Year" /></label>
        <label>Skills<input name="skills" value={profile.skills} onChange={handleChange} placeholder="Python, Java, React" /></label>
        <label>Career Interests<input name="interests" value={profile.interests} onChange={handleChange} placeholder="Web Development, AI" /></label>
        <label>About Me<textarea name="bio" value={profile.bio} onChange={handleChange} rows={4} /></label>
        <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button>
        <button type="button" onClick={() => { localStorage.removeItem('token'); navigate('/login') }}>Logout</button>
      </form>
    </main>
  )
}

export default Profile
