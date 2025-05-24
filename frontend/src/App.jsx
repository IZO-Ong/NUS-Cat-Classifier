import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Pages/Home'
import Cats from './Pages/Cats'
import CatDetail from './Pages/CatDetail'
import './styles/App.css'

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
          <Route path="/cats/:slug" element={<CatDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
