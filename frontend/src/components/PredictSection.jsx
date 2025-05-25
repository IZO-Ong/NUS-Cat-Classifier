import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import '../styles/PredictSection.css'

export default function PredictSection({ loading, prediction, onPredict, disabled, slug }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (prediction) {
      setVisible(false)
      const timeout = setTimeout(() => setVisible(true), 50)
      return () => clearTimeout(timeout)
    } else {
      setVisible(false)
    }
  }, [prediction])

  const isValidCat = prediction && prediction.toLowerCase() !== 'not a cat'

  return (
    <div className="predict-section">
      {loading ? (
        <Spinner
          animation="border"
          role="status"
          variant="secondary"
          style={{ width: '2.5rem', height: '2.5rem' }}
        />
      ) : prediction ? (
        <h2 className={`predict-text ${visible ? 'visible' : ''}`}>
          Prediction:{' '}
          {isValidCat ? (
            <Link to={`/cats/${slug}`} className="predict-link">
              {prediction}
            </Link>
          ) : (
            prediction
          )}
        </h2>
      ) : (
        <Button variant="primary" onClick={onPredict} disabled={disabled}>
          Predict
        </Button>
      )}
    </div>
  )
}
