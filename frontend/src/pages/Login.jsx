import { Link, useLocation } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import '../styles/Login.css'

export default function Login({ setUsername }) {
  const location = useLocation()
  const timedOut = location.state?.timedOut

  return (
    <div className="login-wrapper">
      <h2>Login</h2>

      {timedOut && (
        <div className="status-wrapper">
          <div className="status-message error">
            Your session has timed out. Please log in again.
          </div>
        </div>
      )}

      <LoginForm setUsername={setUsername} />

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <span style={{ fontSize: '0.95rem' }}>Don’t have an account? </span>
        <Link to="/signup" style={{ color: '#1e40af', fontWeight: 500, textDecoration: 'underline' }}>
          Sign up here
        </Link>
      </div>
    </div>
  )
}
