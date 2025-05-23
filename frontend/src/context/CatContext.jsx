import { createContext, useContext, useState, useEffect } from 'react'

const CatContext = createContext()

export function CatProvider({ children }) {
  const [imagePreview, setImagePreview] = useState(() => localStorage.getItem('imagePreview'))
  const [prediction, setPrediction] = useState(() => localStorage.getItem('prediction'))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (imagePreview) localStorage.setItem('imagePreview', imagePreview)
    else localStorage.removeItem('imagePreview')
  }, [imagePreview])

  useEffect(() => {
    if (prediction) localStorage.setItem('prediction', prediction)
    else localStorage.removeItem('prediction')
  }, [prediction])

  return (
    <CatContext.Provider value={{
      imagePreview, setImagePreview,
      prediction, setPrediction,
      loading, setLoading
    }}>
      {children}
    </CatContext.Provider>
  )
}

export const useCat = () => useContext(CatContext)
