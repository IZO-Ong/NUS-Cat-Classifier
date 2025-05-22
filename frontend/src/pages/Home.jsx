import UploadForm from '../components/UploadForm'
import Preview from '../components/Preview'
import Prediction from '../components/Prediction'
import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

export default function Home() {
  const [imagePreview, setImagePreview] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <Card className="main-box shadow-sm text-center">
      <Card.Body className="p-0">
        <div className="card-inner">
          <h1 className="heading">
            Cat Classifier <span className="emoji">🐱</span>
          </h1>
        <UploadForm
          setImagePreview={setImagePreview}
          setPrediction={setPrediction}
          setLoading={setLoading}
        />
        {loading && <Spinner animation="border" role="status" className="mt-3" />}
        <Preview imagePreview={imagePreview} />
        <Prediction prediction={prediction} />
        </div>
      </Card.Body>
    </Card>
  )
}
