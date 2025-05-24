import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

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
    <div
      style={{
        minHeight: '4rem',
        marginTop: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {loading ? (
        <Spinner
          animation="border"
          role="status"
          variant="secondary"
          style={{ width: '2.5rem', height: '2.5rem' }}
        />
      ) : prediction ? (
        <h2
          style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.5s ease'
          }}
        >
          Prediction:{' '}
          {isValidCat ? (
            <Link to={`/cats/${slug}`} style={{ color: '#0d6efd', textDecoration: 'underline' }}>
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
