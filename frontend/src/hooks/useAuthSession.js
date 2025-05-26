import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

export default function useAuthSession(setUsername, setUserID) {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    const storage = localStorage.getItem('token') ? localStorage : sessionStorage

    if (token) {
      try {
        const decoded = jwtDecode(token)
        const now = Date.now() / 1000

        if (decoded.exp < now) {
          storage.clear()
          navigate('/login', { state: { timedOut: true } })
        } else {
          setUsername(storage.getItem('username'))
          setUserID(storage.getItem('userID'))

          const delay = (decoded.exp - now) * 1000
          const logoutTimer = setTimeout(() => {
            storage.clear()
            navigate('/login', { state: { timedOut: true } })
          }, delay)

          return () => clearTimeout(logoutTimer)
        }
      } catch {
        storage.clear()
        navigate('/login', { state: { timedOut: true } })
      }
    }
  }, [])
}
