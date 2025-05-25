import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
const Home = lazy(() => import('./Pages/Home'))
const Cats = lazy(() => import('./Pages/Cats'))
const CatDetail = lazy(() => import('./Pages/CatDetail'))
import './styles/App.css'

function App() {
  return (
    <Router>
      <div className="custom-layout">
        <nav className="top-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
            Home
          </NavLink>
          <NavLink to="/cats" className={({ isActive }) => isActive ? 'nav-button active' : 'nav-button'}>
            Cats
          </NavLink>
        </nav>

        <main className="main-content">
          <Suspense fallback={<div className="status-message loading">Loading page...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cats" element={<Cats />} />
              <Route path="/cats/:slug" element={<CatDetail />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App
