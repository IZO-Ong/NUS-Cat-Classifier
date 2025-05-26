import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useCat } from '../context/CatContext'

export default function Navbar({ username, setUsername }) {
  const { setPrediction, setImagePreview } = useCat()
  const navigate = useNavigate()

  const handleLogout = () => {
  localStorage.clear()
  sessionStorage.clear()

  setPrediction(null)
  setImagePreview(null)
  setUsername(null)

  navigate('/')
  }

  return (
    <nav className="top-nav" style={{ justifyContent: 'space-between', padding: '1rem 2rem' }}>
      <div style={{ color: '#fff', fontWeight: 500, fontSize: '1rem' }}>
        Welcome {username || 'Guest'}!
      </div>
      <div>
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
          Home
        </NavLink>
        <NavLink to="/cats" className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
          Cats
        </NavLink>
        {!username ? (
          <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
            Login
          </NavLink>
        ) : (
          <Link to="/" onClick={e => { e.preventDefault(); handleLogout() }} className="nav-button logout-button" style={{ background: '#e11d48', color: '#fff' }}>
            Logout
          </Link>
        )}
      </div>
    </nav>
  )
}
