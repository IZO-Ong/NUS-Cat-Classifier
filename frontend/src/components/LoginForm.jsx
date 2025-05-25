import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginForm({ setUsername }) {
  const [username, setLocalUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
      } else {
        const storage = rememberMe ? localStorage : sessionStorage
        storage.setItem('token', data.token)
        storage.setItem('username', username)

        setUsername(username) // This updates app-level state!
        navigate('/')
      }

    } catch (err) {
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
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
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
