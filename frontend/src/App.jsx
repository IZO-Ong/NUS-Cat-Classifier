import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Cats from './pages/Cats'
import './App.css'

function App() {
  return (
    <Router>
      <div className="custom-layout">
        <div className="top-nav">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/cats" className="nav-button">Cats</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cats" element={<Cats />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
