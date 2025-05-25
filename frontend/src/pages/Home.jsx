import { useEffect, useState } from 'react'
import { useCat } from '../context/CatContext'
import UploadForm from '../components/UploadForm'
import Preview from '../components/Preview'
import PredictSection from '../components/PredictSection'
import '../styles/Home.css'

export default function Home() {
  const {
    imagePreview,
    setImagePreview,
    prediction,
    setPrediction,
    loading,
    setLoading,
    lastPredictedCat,
    setLastPredictedCat
  } = useCat()

  const [pendingFile, setPendingFile] = useState(null)
  const [fadeReady, setFadeReady] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeReady(true)
    }, 10)
    return () => clearTimeout(timeout)
  }, [])

  const handlePredict = async () => {
    if (!pendingFile) return
    setLoading(true)

    const formData = new FormData()
    formData.append('image', pendingFile)

    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      setPrediction(data.prediction)
      if (data.prediction.toLowerCase() !== 'not a cat') {
        setLastPredictedCat({ name: data.prediction, slug: data.slug })
      }
    } catch {
      setPrediction('Error fetching prediction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`main-box text-center fade-ready ${
        fadeReady ? 'fade-in' : ''
      }`}
    >
      <div className="card-inner">
        <h1 className="heading fade-delay-1">
          NUS Cat Classifier <span className="emoji">🐱</span>
        </h1>

        <div className="fade-delay-2">
          <UploadForm
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            setPrediction={setPrediction}
            setLoading={setLoading}
            setPendingFile={setPendingFile}
          />
        </div>

        {imagePreview && (
          <>
            <div className="fade-delay-3">
              <Preview imagePreview={imagePreview} />
            </div>
            <div className="fade-delay-4">
              <PredictSection
                loading={loading}
                prediction={prediction}
                onPredict={handlePredict}
                disabled={!pendingFile}
                slug={lastPredictedCat?.slug}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
