import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordField from './PasswordField'

export default function SignupForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [checking, setChecking] = useState(false)
  const [available, setAvailable] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedIn = localStorage.getItem('username') || sessionStorage.getItem('username')
    if (loggedIn) navigate('/')
  }, [])

  useEffect(() => {
    if (!username) return
    setChecking(true)
    const timeout = setTimeout(async () => {
      const res = await fetch('http://localhost:5000/api/users')
      const users = await res.json()
      const taken = users.some(user => user.username === username)
      setAvailable(!taken)
      setChecking(false)
    }, 400)
    return () => clearTimeout(timeout)
  }, [username])

  function getPasswordStrength(pw) {
    if (pw.length < 6) return 'weak'
    if (pw.match(/[0-9]/) && pw.match(/[A-Z]/) && pw.length >= 8) return 'strong'
    return 'medium'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Signup failed')
      } else {
        setSuccess('Account created successfully. Redirecting to login...')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
        setTimeout(() => navigate('/login'), 2000)
      }
    } catch {
      setError('Network error. Please try again later.')
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {username && (
        <div className="username-status">
          {checking ? 'Checking availability...' : available ? '✅ Available' : '❌ Taken'}
        </div>
      )}

      <PasswordField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      {password && (
        <div className={`password-strength ${getPasswordStrength(password)}`}>
          Strength: {getPasswordStrength(password)}
        </div>
      )}

      <PasswordField
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSubmit(e)
        }}
      />

      <button type="submit">Create Account</button>

      {error && <div className="status-wrapper"><div className="status-message error">{error}</div></div>}
      {success && <div className="status-wrapper"><div className="status-message loading">{success}</div></div>}
    </form>
  )
}