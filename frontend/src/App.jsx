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
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingFilmId, setEditingFilmId] = useState(null)
  const [selectedFilm, setSelectedFilm] = useState(null)

const handleViewDetails = (film) => {
  setSelectedFilm(film)
}


const handleEditFilm = (film) => {
  setEditingFilmId(film.id)

  setFormData({
    tenPhim: film.title || '',
    moTa: film.description || '',
    thoiLuong: String(film.duration ?? ''),
    namPhatHanh: String(film.year ?? ''),
    ngayKhoiChieu: '',
    ngonNgu: film.language || '',
    quocGia: film.country || '',
    maTheLoai: '',
    maDaoDien: '',
    posterUrl: film.poster || '',
  })

  setFormError('')
  setShowAddForm(true)
}

const handleDeleteFilm = async (film) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${film.title}"?`
  )

  if (!confirmed) return

  try {
    const response = await fetch(
      `http://localhost:5220/api/films/${film.id}`,
      {
        method: 'DELETE',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete film. Please try again.')
    }

    setFilms((previousFilms) =>
      previousFilms.filter((item) => item.id !== film.id)
    )

    if (selectedFilm?.id === film.id) {
      setSelectedFilm(null)
    }
  } catch (err) {
    window.alert(err.message || 'An unexpected error occurred.')
  }
}

  const [formData, setFormData] = useState({
    tenPhim: '',
    moTa: '',
    thoiLuong: '',
    namPhatHanh: '',
    ngayKhoiChieu: '',
    ngonNgu: '',
    quocGia: '',
    maTheLoai: '',
    maDaoDien: '',
    posterUrl: '',
  })

  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)



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

        const mappedFilms = (data.value ?? data).map((film) => ({
          id: film.maPhim,
          title: film.tenPhim,
          year: film.namPhatHanh,
          duration: film.thoiLuong,
          language: film.ngonNgu,
          country: film.quocGia,
          description: film.moTa,
          genre: `Genre ${film.maTheLoai}`,
          director: `Director ${film.maDaoDien}`,
          poster: film.posterUrl || (
            film.maPhim === 1
              ? 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80'
              : 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=800&q=80'
          ),
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

const handleAddFilm = async (event) => {
  event.preventDefault()

  setFormError('')
if (
  !formData.tenPhim.trim() ||
  !formData.thoiLuong ||
  !formData.namPhatHanh ||
  !formData.ngonNgu.trim() ||
  !formData.quocGia.trim() ||
  (editingFilmId === null &&
    (!formData.ngayKhoiChieu ||
      !formData.maTheLoai ||
      !formData.maDaoDien))
) {
  setFormError('Please fill in all required fields.')
  return
}

  setIsSubmitting(true)

  try {
    const response = await fetch(
  editingFilmId !== null
    ? `http://localhost:5220/api/films/${editingFilmId}`
    : 'http://localhost:5220/api/films',
  {
    method: editingFilmId !== null ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tenPhim: formData.tenPhim.trim(),
        moTa: formData.moTa.trim() || null,
        thoiLuong: Number(formData.thoiLuong),
        namPhatHanh: Number(formData.namPhatHanh),
        ngayKhoiChieu: formData.ngayKhoiChieu,
        ngonNgu: formData.ngonNgu.trim(),
        quocGia: formData.quocGia.trim(),
        maTheLoai: Number(formData.maTheLoai),
        maDaoDien: Number(formData.maDaoDien),
        posterUrl: formData.posterUrl.trim() || null,
      }),
    })

    
if (!response.ok) {
  throw new Error(
    editingFilmId !== null
      ? 'Failed to update film. Please try again.'
      : 'Failed to add film. Please try again.'
  )
}

const savedFilm = await response.json()

const mappedFilm = {
  id: savedFilm.maPhim,
  title: savedFilm.tenPhim,
  year: savedFilm.namPhatHanh,
  duration: savedFilm.thoiLuong,
  language: savedFilm.ngonNgu,
  country: savedFilm.quocGia,
  description: savedFilm.moTa,
  genre: `Genre ${savedFilm.maTheLoai}`,
  director: `Director ${savedFilm.maDaoDien}`,
  poster: savedFilm.posterUrl || formData.posterUrl.trim() || null,
}

if (editingFilmId !== null) {
  setFilms((previousFilms) =>
    previousFilms.map((film) =>
      film.id === editingFilmId ? mappedFilm : film
    )
  )
} else {
  setFilms((previousFilms) => [...previousFilms, mappedFilm])
}

    setShowAddForm(false)
    setFormData({
      tenPhim: '',
      moTa: '',
      thoiLuong: '',
      namPhatHanh: '',
      ngayKhoiChieu: '',
      ngonNgu: '',
      quocGia: '',
      maTheLoai: '',
      maDaoDien: '',
      posterUrl: '',
    })
  } catch (err) {
    setFormError(err.message || 'An unexpected error occurred.')
  } finally {
    setIsSubmitting(false)
  }
}

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

      <button
        className="add-button"
        onClick={() => setShowAddForm(true)}
      >
        <span>+</span>
        Add Film
      </button>
    </header>

    {showAddForm && (
      <div className="modal-overlay">
        <section className="film-form-modal">
          <h2>{editingFilmId !== null ? 'Edit Film' : 'Add New Film'}</h2>

          <form onSubmit={handleAddFilm}>
            <div className="form-group">
              <label>Film title *</label>
              <input
                type="text"
                value={formData.tenPhim}
                onChange={(event) =>
                  setFormData({ ...formData, tenPhim: event.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.moTa}
                onChange={(event) =>
                  setFormData({ ...formData, moTa: event.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Duration (minutes) *</label>
              <input
                type="number"
                min="1"
                value={formData.thoiLuong}
                onChange={(event) =>
                  setFormData({ ...formData, thoiLuong: event.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Release year *</label>
              <input
                type="number"
                min="1888"
                value={formData.namPhatHanh}
                onChange={(event) =>
                  setFormData({ ...formData, namPhatHanh: event.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Release date *</label>
              <input
                type="date"
                value={formData.ngayKhoiChieu}
                onChange={(event) =>
                  setFormData({ ...formData, ngayKhoiChieu: event.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Language *</label>
              <input
                type="text"
                value={formData.ngonNgu}
                onChange={(event) =>
                  setFormData({ ...formData, ngonNgu: event.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Country *</label>
              <input
                type="text"
                value={formData.quocGia}
                onChange={(event) =>
                  setFormData({ ...formData, quocGia: event.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Genre ID *</label>
              <input
                type="number"
                min="1"
                value={formData.maTheLoai}
                onChange={(event) =>
                  setFormData({ ...formData, maTheLoai: event.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Director ID *</label>
              <input
                type="number"
                min="1"
                value={formData.maDaoDien}
                onChange={(event) =>
                  setFormData({ ...formData, maDaoDien: event.target.value })
                }
                required
              />
            </div>
          
            <div className="form-group">
              <label>Poster URL</label>
              <input
                type="url"
                placeholder="https://example.com/poster.jpg"
                value={formData.posterUrl}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    posterUrl: event.target.value,
                  })
                }
              />
            </div>
            {formError && (
              <p className="login-error">{formError}</p>
            )}

            <div className="form-actions">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingFilmId(null)
                  setFormError('')
                }}
              >
                Cancel
              </button>

              <button type="submit" disabled={isSubmitting}>
                {editingFilmId !== null ? 'Update Film' : 'Save Film'}
              </button>
            </div>
          </form>
        </section>
      </div>
    )}


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
                  <button
                    className="view-button"
                    onClick={() => handleViewDetails(film)}
                  >
                    View Details
                  </button>

                  <button
                    className="view-button"
                    onClick={() => handleEditFilm(film)}
                  >
                    Edit Film
                  </button>

                  <button
                    className="view-button"
                    onClick={() => handleDeleteFilm(film)}
                  >
                    Delete Film
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

      
      {selectedFilm && (
        <div className="film-detail-overlay">
          <div className="film-detail-modal">
            <button
              className="close-button"
              onClick={() => setSelectedFilm(null)}
            >
              ✕
            </button>

            <h2>{selectedFilm.title}</h2>

            <img
              src={selectedFilm.poster}
              alt={selectedFilm.title}
              className="film-detail-poster"
            />

            <p><strong>Year:</strong> {selectedFilm.year}</p>
            <p><strong>Duration:</strong> {selectedFilm.duration} min</p>
            <p><strong>Country:</strong> {selectedFilm.country}</p>
            <p><strong>Language:</strong> {selectedFilm.language}</p>
            <p><strong>Genre:</strong> {selectedFilm.genre}</p>
            <p><strong>Director:</strong> {selectedFilm.director}</p>
            <p><strong>Description:</strong> {selectedFilm.description || 'No description available.'}</p>
          </div>
        </div>
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