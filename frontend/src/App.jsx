import { useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import './styles/App.css'

export default function App() {
  const [username, setUsername] = useState(null)
  const [userID, setUserID] = useState(null)

  return (
    <Router>
      <AppRouter
        username={username}
        setUsername={setUsername}
        setUserID={setUserID}
      />
    </Router>
  )
}
