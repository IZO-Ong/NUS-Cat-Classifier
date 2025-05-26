import { Link } from 'react-router-dom'

export default function CatCard({ cat, delay = 0 }) {
  return (
    <Link
      to={`/cats/${cat.slug}`}
      className={`cat-card fade-in ${cat.graduated ? 'graduated' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <img src={`http://localhost:5000${cat.image}`} alt={cat.slug} />
      <div className="overlay">{cat.name}</div>
    </Link>
  )
}
