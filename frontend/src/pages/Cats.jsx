import { useQuery } from '@tanstack/react-query'
import { useCat } from '../context/CatContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import LocationSection from '../components/LocationSection'
import { groupCatsByLocation } from '../utils/groupCats'
import '../styles/Cats.css'

export default function Cats() {
  const { lastPredictedCat } = useCat()
  const [searchQuery, setSearchQuery] = useState('')

  const API_BASE = import.meta.env.VITE_API_URL || ''

  const { data: cats = [], isLoading, isError } = useQuery({
    queryKey: ['cats'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/cats`)
      if (!res.ok) throw new Error('Failed to fetch cats')
      return res.json()
    },
    retry: 1,
    staleTime: 1000 * 60 * 10,
  })

  const filteredCats = cats.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const grouped = groupCatsByLocation(filteredCats)

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

  return (
    <div className="main-box text-center">
      {lastPredictedCat && lastPredictedCat.name.toLowerCase() !== 'not a cat' && (
        <div className="recent-wrapper fade-in" style={{ animationDelay: '0ms' }}>
          <h2 className="heading">Recently Predicted</h2>
          <Link to={`/cats/${lastPredictedCat.slug}`} className="recent-predicted">
            <img
              src={`${API_BASE}/static/cats/${lastPredictedCat.slug}.png`}
              alt={lastPredictedCat.name}
            />
            <div className="overlay">{lastPredictedCat.name}</div>
          </Link>
        </div>
      )}

      <SearchBar query={searchQuery} setQuery={setSearchQuery} />

      {filteredCats.length === 0 ? (
        <div className="status-wrapper">
          <div className="status-message error">
            😿 No cats found matching that name.
          </div>
        </div>
      ) : (
        displayOrder.map(loc => {
          const group = grouped[loc]
          if (!group) return null
          return <LocationSection key={loc} loc={loc} group={group} />
        })
      )}
    </div>
  )
}
