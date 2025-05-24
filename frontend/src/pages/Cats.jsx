import { useQuery } from '@tanstack/react-query'
import { useCat } from '../context/CatContext'
import { Link } from 'react-router-dom'
import '../styles/Cats.css'

export default function Cats() {
  const { lastPredictedCat } = useCat()

  const { data: cats = [], isLoading, isError } = useQuery({
    queryKey: ['cats'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/cats')
      if (!res.ok) throw new Error('Failed to fetch cats')
      return res.json()
    },
    retry: 1
  })

  if (isLoading) {
    return (
      <div className="status-wrapper">
        <div className="status-message loading">
          🐾 Fetching cats from campus...
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="status-wrapper">
        <div className="status-message error">
          ❌ Unable to load cat data. Please check your connection or try again later.
        </div>
      </div>
    )
  }

  const grouped = cats.reduce((acc, cat) => {
    const group = (() => {
      if (cat.location.toLowerCase().includes('utown')) return 'UTown'
      if (cat.location.toLowerCase().includes('engineering')) return 'Engineering'
      if (cat.location.toLowerCase().includes('computing') || cat.location.toLowerCase().includes('biz')) return 'Computing / Biz'
      if (cat.location.toLowerCase().includes('science')) return 'Science'
      if (cat.location.toLowerCase().includes('arts') || cat.location.toLowerCase().includes('fass')) return 'Arts'
      if (cat.location.toLowerCase().includes('temasek')) return 'Temasek'
      if (cat.location.toLowerCase().includes('raffles')) return 'Raffles'
      return 'Others'
    })()
    if (!acc[group]) acc[group] = []
    acc[group].push(cat)
    return acc
  }, {})

  const displayOrder = [
    'UTown',
    'Engineering',
    'Computing / Biz',
    'Science',
    'Arts',
    'Temasek',
    'Raffles',
    'Others'
  ]

  return (
    <div className="main-box text-center shadow-sm">
      {lastPredictedCat && lastPredictedCat.name.toLowerCase() !== 'not a cat' && (
        <div className="recent-wrapper fade-in" style={{ animationDelay: '0ms' }}>
          <h2 className="heading">Recently Predicted</h2>
          <Link to={`/cats/${lastPredictedCat.slug}`} className="recent-predicted">
            <img
              src={`http://localhost:5000/static/cats/${lastPredictedCat.slug}.png`}
              alt={lastPredictedCat.name}
            />
            <div className="overlay">{lastPredictedCat.name}</div>
          </Link>
        </div>
      )}

      {displayOrder.map(loc => {
        const group = grouped[loc]
        if (!group) return null

        const classNameSafe = loc.toLowerCase().replace(/[^a-z0-9]/g, '-')

        return (
          <div key={loc} className={`location-group themed-group themed-${classNameSafe}`}>
            <h3>{loc}</h3>
            <div className="cat-grid">
              {group.map((cat, index) => (
                <Link
                  key={cat.slug}
                  to={`/cats/${cat.slug}`}
                  className="cat-card fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img src={`http://localhost:5000${cat.image}`} alt={cat.slug} />
                  <div className="overlay">{cat.name}</div>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}