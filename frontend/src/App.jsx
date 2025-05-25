import { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useCat } from './context/CatContext'
import Navbar from './components/Navbar'

const Home = lazy(() => import('./Pages/Home'))
const Cats = lazy(() => import('./Pages/Cats'))
const CatDetail = lazy(() => import('./Pages/CatDetail'))
const Login = lazy(() => import('./Pages/Login'))
const CreateAccount = lazy(() => import('./Pages/CreateAccount'))

import './styles/App.css'

function App() {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username') || localStorage.getItem('username')
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])
  
  return (
    <Router>
      <div className="custom-layout">
        <Navbar username={username} setUsername={setUsername} />
        <main className="main-content">
          <Suspense fallback={<div className="status-message loading">Loading page...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cats" element={<Cats />} />
              <Route path="/cats/:slug" element={<CatDetail />} />
              <Route path="/login" element={<Login setUsername={setUsername} />} />
              <Route path="/signup" element={<CreateAccount />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App
