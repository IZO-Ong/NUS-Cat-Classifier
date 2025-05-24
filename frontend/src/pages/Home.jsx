import { useCat } from '../context/CatContext'
import UploadForm from '../components/UploadForm'
import Preview from '../components/Preview'
import PredictSection from '../components/PredictSection'
import { useState } from 'react'
import '../styles/Home.css'

export default function Home() {
  const { imagePreview, setImagePreview, prediction, setPrediction, loading, setLoading, lastPredictedCat, setLastPredictedCat } = useCat()
  const [pendingFile, setPendingFile] = useState(null)

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
    <div className="main-box text-center shadow-sm">
      <div className="card-inner">
        <h1 className="heading">
          Cat Classifier <span className="emoji">🐱</span>
        </h1>

          <UploadForm
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            setPrediction={setPrediction}
            setLoading={setLoading}
            setPendingFile={setPendingFile}
          />

          {imagePreview && (
            <>
              <Preview imagePreview={imagePreview} />
              <PredictSection
                loading={loading}
                prediction={prediction}
                onPredict={handlePredict}
                disabled={!pendingFile}
                slug={lastPredictedCat?.slug}
              />
            </>
          )}
        </div>
    </div>
  )
}
