import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import '../styles/CatDetail.css'

export default function CatDetail() {
  const { slug } = useParams()
  const [fadeVisible, setFadeVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeVisible(true)
    }, 10)
    return () => clearTimeout(timeout)
  }, [])

  const {
    data: cat,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['cat', slug],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/cats/${slug}`)
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
    retry: 1, // retry once on failure
  })

  if (isLoading) {
    return (
      <div className="status-wrapper">
        <div className="status-message loading">Loading cat info...</div>
      </div>
    )
  }

  if (isError || cat?.error) {
    return (
      <div className="status-wrapper">
        <div className="status-message error">😿 No cats found matching that name.</div>
      </div>
    )
  }

  return (
    <div className={`main-box fade-ready ${fadeVisible ? 'fade-in' : ''}`}>
      <div className="cat-detail-container">
        <div className="cat-header">
          <img
            className="cat-image"
            src={`http://localhost:5000${cat.image}`}
            alt={cat.name}
          />
          <div className="cat-meta">
            <div className="cat-title-row">
              <h1 className="cat-name">{cat.name}</h1>
              <span className="prediction-tag">
                {cat.predictionCount ?? 0} Predictions
              </span>
            </div>
            <div className="cat-location">📍 {cat.location ?? 'Unknown Location'}</div>
          </div>
        </div>

        <div className="cat-meta-row">
          <p><strong>Likes:</strong> {cat.likes.join(', ') || 'N/A'}</p>
          <p><strong>Sex:</strong> {cat.sex}</p>
          {cat.graduated && (
            <p className="graduated-note">🎓 This cat has graduated!</p>
          )}
        </div>

        <div className="cat-comments">
          <h3>Comments</h3>
          <p className="no-comments">🛠️ Comment section coming soon!</p>
        </div>
      </div>
    </div>
  )
}
