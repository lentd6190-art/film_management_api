import { useEffect, useState } from 'react'
import './App.css'

const films = [
  {
    id: 1,
    title: 'Avengers: Endgame',
    year: 2019,
    duration: 181,
    language: 'English',
    country: 'USA',
    genre: 'Action',
    director: 'Anthony Russo, Joe Russo',
    description:
      'Biệt đội Avengers đối đầu với Thanos trong trận chiến quyết định số phận của vũ trụ.',
    poster:
      'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Interstellar',
    year: 2014,
    duration: 169,
    language: 'English',
    country: 'USA',
    genre: 'Sci-Fi',
    director: 'Christopher Nolan',
    description:
      'Một nhóm phi hành gia thực hiện chuyến hành trình xuyên không gian để tìm kiếm tương lai cho nhân loại.',
    poster:
      'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=800&q=80',
  },
]

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    if (username === 'admin' && password === 'admin123') {
      setError('')
      onLogin()
    } else {
      setError('Invalid username or password')
    }
  }

  const handleForgotPassword = (event) => {
    event.preventDefault()
    alert('Password recovery is not available in the demo version.')
  }

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <section className="login-brand">
        <div className="brand-content">
          <div className="brand-logo">
            <span className="brand-film">Film</span>
            <span className="brand-m">M</span>
          </div>

          <p className="brand-title">
            FILM MANAGEMENT SYSTEM
          </p>

          <div className="brand-line"></div>

          <p className="brand-tagline">
            Organize
            <span>•</span>
            Manage
            <span>•</span>
            Create
          </p>
        </div>
      </section>

      <section className="login-section">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">🎬</div>

            <h1>Welcome back</h1>

            <p>
              Sign in to manage your film collection
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value)
                  setError('')
                }}
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    setError('')
                  }}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />

                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
            >
              SIGN IN
            </button>
          </form>

          <div className="demo-account">
            <div className="demo-divider">
              <span></span>
              <p>Demo account</p>
              <span></span>
            </div>

            <strong>
              admin / admin123
            </strong>
          </div>

          <div className="login-footer">
            <span>Film Management System</span>
            <span>© 2026</span>
          </div>
        </div>
      </section>
    </div>
  )
}


function FilmManagementHome() {
  const [search, setSearch] = useState('')
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  
  useEffect(() => {
    console.log('FilmManagementHome mounted')

    const fetchFilms = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'http://localhost:5220/api/films',
        )

        if (!response.ok) {
          throw new Error('Unable to load films from API.')
        }

        const data = await response.json()

        const mappedFilms = data.map((film) => ({
          id: film.maPhim,
          title: film.tenPhim,
          year: film.namPhatHanh,
          duration: film.thoiLuong,
          language: film.ngonNgu,
          country: film.quocGia,
          description: film.moTa,
          genre: `Genre ${film.maTheLoai}`,
          director: `Director ${film.maDaoDien}`,
          poster:
            film.maPhim === 1
              ? 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80'
              : 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=800&q=80',
        }))

        setFilms(mappedFilms)
      } catch (err) {
        console.error('Fetch films error:', err)
        setError(err.message || 'An unexpected error occurred.')
      } finally {
        setLoading(false)
      }
    }

    fetchFilms()
  }, [])


  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="brand-icon">F</div>

          <div>
            <h1>FILM MANAGEMENT</h1>
            <span>Movie Collection System</span>
          </div>
        </div>

        <button className="add-button">
          <span>+</span>
          Add Film
        </button>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <span className="eyebrow">FILM LIBRARY</span>

            <h2>
              Manage your
              <br />
              <span>film collection.</span>
            </h2>

            <p>
              Explore, manage and organise your favourite movies
              in one place.
            </p>
          </div>

          <div className="film-count">
            <strong>{films.length}</strong>
            <span>Films</span>
          </div>
        </section>

        <section className="toolbar">
          <div className="search-box">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search films..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="filter-label">
            <span>Showing</span>
            <strong>{filteredFilms.length}</strong>
            <span>films</span>
          </div>
        </section>

        {loading ? (
            <div className="empty-state">
              <h3>Loading films...</h3>
              <p>Please wait while we load your film collection.</p>
            </div>
          ) : error ? (
            <div className="empty-state">
              <h3>Unable to load films</h3>
              <p>{error}</p>
            </div>
          ) : (
            <section className="film-grid">
    {filteredFilms.map((film) => (
            <article
              className="film-card"
              key={film.id}
            >
              <div className="poster-wrapper">
                <img
                  src={film.poster}
                  alt={film.title}
                  className="film-poster"
                />

                <div className="poster-overlay">
                  <button className="view-button">
                    View Details
                  </button>
                </div>

                <span className="genre-badge">
                  {film.genre}
                </span>
              </div>

              <div className="film-info">
                <div className="film-title-row">
                  <h3>{film.title}</h3>

                  <span className="film-year">
                    {film.year}
                  </span>
                </div>

                <p className="film-description">
                  {film.description}
                </p>

                <div className="film-meta">
                  <span>
                    <b>◷</b> {film.duration} min
                  </span>

                  <span>
                    <b>◎</b> {film.country}
                  </span>

                  <span>
                    <b>◈</b> {film.language}
                  </span>
                </div>

                <div className="film-director">
                  <span>DIRECTOR</span>
                  <strong>{film.director}</strong>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

        {filteredFilms.length === 0 && (
          <div className="empty-state">
            <div>🎬</div>
            <h3>No films found</h3>
            <p>
              Try searching with another film title.
            </p>
          </div>
        )}
      </main>

      <footer>
        <span>FILM MANAGEMENT API</span>
        <span>OpenAPI • Swagger • React</span>
      </footer>
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={() => setIsLoggedIn(true)}
      />
    )
  }

  return <FilmManagementHome />
}

export default App