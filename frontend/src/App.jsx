
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Login from './pages/Login'
import Register from './pages/Register'

function Home() {
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          Campus Connect
        </div>

        <div className="nav-buttons">
          <Link to="/login">
            <button className="login">Login</button>
          </Link>

          <Link to="/register">
            <button className="register">Register</button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <h1>
          Welcome to <span>Campus Connect</span>
        </h1>

        <p>
          Connect with students, discover opportunities,
          and grow together.
        </p>

        <Link to="/register">
          <button className="hero-button">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features */}
      <section className="features">

        <div className="card">
          <h3>👥 Connect</h3>
          <p>
            Connect and collaborate with students
            from your campus.
          </p>
        </div>

        <div className="card">
          <h3>💼 Opportunities</h3>
          <p>
            Discover internships, events, projects,
            and exciting opportunities.
          </p>
        </div>

        <div className="card">
          <h3>🚀 Collaborate</h3>
          <p>
            Work together on projects and build
            your skills.
          </p>
        </div>

      </section>

    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App