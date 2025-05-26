import { Routes, Route, useNavigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './Navbar'
import useAuthSession from '../hooks/useAuthSession'
const Home = lazy(() => import('../Pages/Home'))
const Cats = lazy(() => import('../Pages/Cats'))
const CatDetail = lazy(() => import('../Pages/CatDetail'))
const Login = lazy(() => import('../Pages/Login'))
const CreateAccount = lazy(() => import('../Pages/CreateAccount'))

export default function AppRouter({ username, setUsername, setUserID }) {
  useAuthSession(setUsername, setUserID)

  return (
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
  )
}
