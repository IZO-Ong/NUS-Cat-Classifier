export default function CatHeader({ cat }) {
  if (!cat) return null

  const API_BASE = import.meta.env.VITE_API_URL || ''

  return (
    <div className="cat-header">
      <img className="cat-image" src={`${API_BASE}${cat.image}`} alt={cat.name} />
      <div className="cat-meta">
        <div className="cat-title-row">
          <h1 className="cat-name">{cat.name}</h1>
          <span className="prediction-tag">{cat.predictionCount ?? 0} Predictions</span>
        </div>
        <div className="cat-location">📍 {cat.location ?? 'Unknown Location'}</div>
      </div>
    </div>
  )
}

