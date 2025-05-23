import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CatProvider } from './context/CatContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CatProvider>
      <App />
    </CatProvider>
  </StrictMode>,
)
