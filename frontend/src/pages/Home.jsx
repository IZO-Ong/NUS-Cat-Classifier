import { useCat } from '../context/CatContext'
import UploadForm from '../components/UploadForm'
import Preview from '../components/Preview'
import PredictSection from '../components/PredictSection'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

export default function Home() {
  const { imagePreview, setImagePreview, prediction, setPrediction, loading, setLoading } = useCat()
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
    } catch {
      setPrediction('Error fetching prediction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="main-box shadow-sm text-center">
      <Card.Body className="p-0">
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
              />
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
