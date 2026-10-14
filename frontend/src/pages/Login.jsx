
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (loading) return

    setLoading(true)

    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5001'

      const response = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Login failed. Check your email and password.')
        return
      }

      // Store token only if your backend returns one.
      if (data.token) {
        localStorage.setItem('token', data.token)
      }

      alert('Login successful! Welcome to Campus Connect 🎉')
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Login error:', error)
      alert('Cannot connect to the backend. Please check the server URL.')
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
          <div className="register-emoji">👋</div>
          <h1>Welcome Back!</h1>
          <p>Login to continue your Campus Connect journey.</p>
        </div>

        <form onSubmit={handleLogin} className="register-form">
          <label htmlFor="login-email">Email Address</label>
          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button type="submit" className="register-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        <p className="register-login">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>

        <Link to="/" className="register-back">← Back to Home</Link>
      </div>
    </div>
  )
}

export default Login
