
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import Dashboard from './pages/Dashboard.jsx'

const features = [
  { icon: '💼', title: 'Jobs & Internships', category: 'Career', description: 'Explore career opportunities, internships and your next big step.', tag: 'CAREER GROWTH', path: '/jobs' },
  { icon: '📚', title: 'Learn & Prepare', category: 'Learning', description: 'Build skills with study materials, coding practice and interview prep.', tag: 'KEEP LEARNING', path: '/learn' },
  { icon: '📄', title: 'Resume Builder', category: 'Career', description: 'Organize your skills, education and projects for your next application.', tag: 'GET JOB READY', path: '/resume-builder' },
  { icon: '🚀', title: 'Projects & Hackathons', category: 'Projects', description: 'Discover project ideas, collaborate and build your portfolio.', tag: 'BUILD SOMETHING', path: '/projects' },
  { icon: '🤝', title: 'Student Community', category: 'Community', description: 'Connect with fellow students, share ideas and learn together.', tag: 'GROW TOGETHER', path: '/community' },
  { icon: '🎯', title: 'Placement Preparation', category: 'Learning', description: 'Prepare for aptitude tests, technical rounds and HR interviews.', tag: 'AIM HIGHER', path: '/placements' },
  { icon: '📝', title: 'Study Resources', category: 'Learning', description: 'Explore notes and useful study resources.', tag: 'STUDY SMART', path: '/study-materials' },
  { icon: '💡', title: 'Career Guidance', category: 'Career', description: 'Explore career paths and plan your next move.', tag: 'FIND YOUR PATH', path: '/career-guidance' },
]

const pageContent = {
  '/jobs': {
    title: 'Jobs & Internships',
    description: 'Explore opportunities and plan your next career step.',
    items: ['Internships', 'Software Developer Jobs', 'Remote Opportunities', 'Freshers Jobs'],
  },
  '/learn': {
    title: 'Learn & Prepare',
    description: 'Build skills with these learning paths.',
    items: ['Python Programming', 'Java Programming', 'Web Development', 'Machine Learning', 'Data Structures & Algorithms', 'Interview Preparation'],
  },
  '/study-materials': {
    title: 'Study Materials',
    description: 'Explore subject-wise study resources.',
    items: ['C Programming', 'DBMS', 'Computer Networks', 'Operating Systems', 'Software Engineering', 'Artificial Intelligence'],
  },
  '/resume-builder': {
    title: 'Resume Builder',
    description: 'Prepare a professional resume.',
    items: ['Education', 'Technical Skills', 'Projects', 'Certifications'],
  },
  '/projects': {
    title: 'Projects & Hackathons',
    description: 'Discover project ideas and build your portfolio.',
    items: ['Web Development Projects', 'AI & ML Projects', 'Cybersecurity Projects', 'Hackathons'],
  },
  '/community': {
    title: 'Student Community',
    description: 'Learn and collaborate with fellow students.',
    items: ['Peer Learning', 'Project Collaboration', 'Skill Sharing'],
  },
  '/placements': {
    title: 'Placement Preparation',
    description: 'Prepare for placement tests and interviews.',
    items: ['Aptitude Practice', 'Coding Practice', 'Technical Interviews', 'HR Interviews'],
  },
  '/career-guidance': {
    title: 'Career Guidance',
    description: 'Explore career paths and opportunities.',
    items: ['Software Engineering', 'Data Science', 'Cybersecurity', 'AI & Machine Learning'],
  },
}

function Home() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', 'Career', 'Learning', 'Projects', 'Community']

  const filteredFeatures = features.filter((feature) => {
    const matchesSearch =
      `${feature.title} ${feature.description} ${feature.category}`
        .toLowerCase()
        .includes(search.toLowerCase())

    return matchesSearch &&
      (activeCategory === 'All' || feature.category === activeCategory)
  })

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="brand">
          <span className="brand-icon">C</span>
          <span>Campus<span className="brand-accent">Connect</span></span>
        </Link>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Explore</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="register-btn">Join Campus Connect ↗</Link>
          {localStorage.getItem('token') && (
            <Link to="/dashboard" className="login-btn">Dashboard</Link>
          )}
        </div>
      </nav>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              YOUR STUDENT JOURNEY STARTS HERE
            </div>
            <h1>
              Your future.<br />
              Your <span className="gradient-text">opportunity.</span><br />
              Your community.
            </h1>
            <p className="hero-description">
              One place for students to discover opportunities, learn new
              skills, prepare for placements and build a brighter future.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="primary-btn">Get Started Free →</Link>
              <a href="#features" className="secondary-btn">Explore Features ↓</a>
            </div>
            <div className="hero-note">🎓 Built for students. Designed for your future.</div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow" />
            <div className="visual-main-card">
              <div className="visual-card-top">
                <span className="mini-logo">C</span>
                <span className="preview-label">YOUR CAREER SPACE</span>
                <span className="preview-status">● Ready to grow</span>
              </div>
              <div className="visual-welcome">
                <div>
                  <p className="muted-label">WELCOME TO YOUR NEXT CHAPTER</p>
                  <h2>Make your next move count.</h2>
                  <p>Learn. Connect. Achieve.</p>
                </div>
                <div className="visual-emoji">🚀</div>
              </div>
              <div className="preview-grid">
                <div className="preview-tile"><span>💼</span><strong>Career</strong><small>Find opportunities</small></div>
                <div className="preview-tile"><span>📚</span><strong>Learning</strong><small>Build your skills</small></div>
                <div className="preview-tile"><span>🤝</span><strong>Community</strong><small>Grow together</small></div>
                <div className="preview-tile"><span>🎯</span><strong>Placements</strong><small>Prepare with purpose</small></div>
              </div>
              <div className="preview-bottom"><span className="online-dot" />Every small step moves you forward.</div>
            </div>
            <div className="floating-card float-top">
              <span className="float-icon purple">✨</span>
              <div><strong>Discover more</strong><small>Your next opportunity awaits</small></div>
            </div>
            <div className="floating-card float-bottom">
              <span className="float-icon green">📈</span>
              <div><strong>Keep growing</strong><small>One skill at a time</small></div>
            </div>
          </div>
        </section>

        <section className="stats-strip">
          <div><span className="stat-icon">🎯</span><p><strong>Career</strong><small>Opportunities</small></p></div>
          <div><span className="stat-icon">📖</span><p><strong>Skill Building</strong><small>Learning resources</small></p></div>
          <div><span className="stat-icon">🌱</span><p><strong>Personal Growth</strong><small>Your journey, your pace</small></p></div>
          <div><span className="stat-icon">🤝</span><p><strong>Student First</strong><small>Community & collaboration</small></p></div>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <div className="eyebrow">EXPLORE CAMPUS CONNECT</div>
            <h2>Everything you need to <span>move forward.</span></h2>
            <p>Explore tools and resources designed to support your student journey.</p>
          </div>

          <div className="feature-search">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search jobs, learning, projects..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search features"
            />
            {search && <button onClick={() => setSearch('')}>Clear</button>}
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? 'filter active' : 'filter'}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="features-grid">
            {filteredFeatures.map((feature, index) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-card-top">
                  <span className={`feature-icon icon-${index % 4}`}>{feature.icon}</span>
                  <span className="feature-arrow">↗</span>
                </div>
                <span className="feature-tag">{feature.tag}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to={feature.path} className="feature-link">
                  Explore this feature <span>→</span>
                </Link>
              </article>
            ))}
          </div>

          {filteredFeatures.length === 0 && (
            <div className="empty-state">
              <h3>No matching features found</h3>
              <p>Try another search or select a different category.</p>
              <button className="primary-btn" onClick={() => { setSearch(''); setActiveCategory('All') }}>
                Show all features
              </button>
            </div>
          )}
        </section>

        <section className="about-section" id="about">
          <div className="section-heading">
            <div className="eyebrow">ABOUT CAMPUS CONNECT</div>
            <h2>Empowering Students to Build a <span>Better Future.</span></h2>
            <p>Campus Connect brings learning, career opportunities and collaboration together in one place.</p>
          </div>
          <div className="about-content">
            <div className="about-main-card">
              <span className="about-big-icon">🎓</span>
              <h3>Our Story</h3>
              <p>Every student deserves access to learning resources, career guidance and opportunities to showcase their talent.</p>
              <p>Whether you are learning a new skill, preparing for placements, searching for internships or building a project, Campus Connect supports your journey.</p>
            </div>
            <div className="about-detail-card"><span>🎯</span><h3>Our Mission</h3><p>Help students discover opportunities and improve their skills.</p></div>
            <div className="about-detail-card"><span>🌈</span><h3>Our Vision</h3><p>Create a supportive student community for learning and collaboration.</p></div>
            <div className="about-detail-card"><span>💡</span><h3>What We Offer</h3><p>Career opportunities, study resources, placement preparation and project discovery.</p></div>
            <div className="about-detail-card"><span>🤝</span><h3>Who Can Use It?</h3><p>College students who want to learn and prepare for future opportunities.</p></div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-heading">
            <div className="eyebrow">GET IN TOUCH</div>
            <h2>Let's <span>Connect.</span></h2>
            <p>Have a question, suggestion or feedback? Feel free to contact us.</p>
          </div>
          <div className="contact-cards">
            <a className="contact-card" href="mailto:sarikatupakula43@gmail.com"><span className="contact-icon">✉️</span><h3>Email Us</h3><p>sarikatupakula43@gmail.com</p><span className="contact-action">Send an email ↗</span></a>
            <a className="contact-card" href="mailto:sarikatupakula43@gmail.com?subject=Campus%20Connect%20Support"><span className="contact-icon">💬</span><h3>Student Support</h3><p>Questions, ideas and feedback are welcome.</p><span className="contact-action">Contact support ↗</span></a>
          </div>
        </section>

        <section className="journey-section">
          <div className="journey-icon">🌟</div>
          <div className="journey-copy">
            <span className="eyebrow">YOUR NEXT CHAPTER</span>
            <h2>Small steps today. <span>Big possibilities tomorrow.</span></h2>
            <p>Start building skills, exploring opportunities and connecting with a community that believes in growth.</p>
          </div>
          <Link to="/register" className="primary-btn">Start Your Journey →</Link>
        </section>
      </main>

      <footer className="footer" id="footer">
        <Link to="/" className="brand footer-brand">
          <span className="brand-icon">C</span>
          <span>Campus<span className="brand-accent">Connect</span></span>
        </Link>
        <p>Learn together. Grow together. Build your future.</p>
        <div className="footer-links">
          <a href="#home">Home</a><a href="#features">Features</a>
          <a href="#about">About</a><a href="#contact">Contact</a>
          <Link to="/login">Login</Link><Link to="/register">Register</Link>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} Campus Connect. Made for student growth.</div>
      </footer>
    </div>
  )
}

function FeaturePage({ page }) {
  return (
    <main style={{ maxWidth: 1050, margin: '40px auto', padding: 24 }}>
      <Link to="/">← Back to Home</Link>
      <p style={{ color: '#7950e8', marginTop: 28 }}>CAMPUS CONNECT • EXPLORE</p>
      <h1>{page.title}</h1>
      <p>{page.description}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18, marginTop: 28 }}>
        {page.items.map((item) => (
          <article key={item} style={{ padding: 22, border: '1px solid #e5e1ef', borderRadius: 16 }}>
            <h3>{item}</h3>
            <p>Explore this topic and continue your learning journey.</p>
          </article>
        ))}
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {Object.entries(pageContent).map(([path, page]) => (
          <Route key={path} path={path} element={<FeaturePage page={page} />} />
        ))}

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
