import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    if (username === 'admin' && password === 'admin123') {
      setError('')
      alert('Login successful!')
    } else {
      setError('Invalid username or password')
    }
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    alert('Password recovery is not available in the demo version.')
  }

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      {/* =====================================================
          LEFT - BRANDING
      ===================================================== */}

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

      {/* =====================================================
          RIGHT - LOGIN
      ===================================================== */}

      <section className="login-section">
        <div className="login-card">

          {/* Header */}

          <div className="login-header">
            <div className="login-icon">
              🎬
            </div>

            <h1>Welcome back</h1>

            <p>
              Sign in to manage your film collection
            </p>
          </div>

          {/* Form */}

          <form onSubmit={handleLogin}>

            {/* Username */}

            <div className="form-group">
              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setError('')
                }}
                autoComplete="username"
              />
            </div>

            {/* Password */}

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
                  onChange={(e) => {
                    setPassword(e.target.value)
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

            {/* Options */}

            <div className="login-options">

              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span>
                  Remember me
                </span>
              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>

            </div>

            {/* Error */}

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              className="login-button"
            >
              SIGN IN
            </button>

          </form>

          {/* Demo account */}

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

          {/* Footer */}

          <div className="login-footer">
            <span>
              Film Management System
            </span>

            <span>
              © 2026
            </span>
          </div>

        </div>
      </section>
    </div>
  )
}

export default App