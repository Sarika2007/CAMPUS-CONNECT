import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)

    try {
      const apiBase =
  import.meta.env.VITE_API_URL || 'http://localhost:5001'

const response = await fetch(`${apiBase}/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Registration successful! 🎉 Welcome to Campus Connect!')
        navigate('/', { replace: true })
      } else {
        alert(data.message || 'Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Unable to connect to the backend. Please check the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <Link to="/" className="register-brand">
          <span className="brand-icon">C</span>
          <span>Campus<span className="brand-accent">Connect</span></span>
        </Link>

        <div className="register-heading">
          <div className="register-emoji">🎓</div>
          <h1>Create Your Account</h1>
          <p>Join Campus Connect and start building your future.</p>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Create Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
          />

          <button type="submit" className="register-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <p className="register-login">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <Link to="/" className="register-back">← Back to Home</Link>
      </div>
    </div>
  )
}

export default Register
