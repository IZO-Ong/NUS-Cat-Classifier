import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordField from './PasswordField'

export default function LoginForm({ setUsername }) {
  const [username, setLocalUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const API_BASE = import.meta.env.VITE_API_URL || ''

  useEffect(() => {
    const loggedIn = localStorage.getItem('username') || sessionStorage.getItem('username')
    if (loggedIn) navigate('/')
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed')
      } else {
        const storage = rememberMe ? localStorage : sessionStorage
        storage.setItem('token', data.token)
        storage.setItem('username', username)
        storage.setItem('userID', data.userID)
        setUsername(username)
        navigate('/')
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
        onChange={(e) => setLocalUsername(e.target.value)}
        required
      />

      <PasswordField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSubmit(e)
        }}
      />

      <label style={{ fontSize: '0.9rem' }}>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          style={{ marginRight: '0.5rem' }}
        />
        Remember me
      </label>

      <button type="submit">Login</button>

      {error && (
        <div className="status-wrapper">
          <div className="status-message error">{error}</div>
        </div>
      )}
    </form>
  )
}