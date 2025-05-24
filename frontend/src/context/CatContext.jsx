import { createContext, useContext, useState, useEffect } from 'react'

const CatContext = createContext()

export function CatProvider({ children }) {
  const [imagePreview, setImagePreview] = useState(() => sessionStorage.getItem('imagePreview'))
  const [prediction, setPrediction] = useState(() => sessionStorage.getItem('prediction'))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (imagePreview) sessionStorage.setItem('imagePreview', imagePreview)
    else sessionStorage.removeItem('imagePreview')
  }, [imagePreview])

  useEffect(() => {
    if (prediction) sessionStorage.setItem('prediction', prediction)
    else sessionStorage.removeItem('prediction')
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
