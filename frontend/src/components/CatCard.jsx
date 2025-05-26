import { Link } from 'react-router-dom'

export default function CatCard({ cat, delay = 0 }) {

  const API_BASE = import.meta.env.VITE_API_URL || ''

  return (
    <Link
      to={`/cats/${cat.slug}`}
      className={`cat-card fade-in ${cat.graduated ? 'graduated' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <img src={`${API_BASE}${cat.image}`} alt={cat.slug} />
      <div className="overlay">{cat.name}</div>
    </Link>
  )
}
