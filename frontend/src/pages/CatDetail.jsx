import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CatDetail() {
  const { slug } = useParams()
  const [cat, setCat] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/cats/${slug}`)
      .then(res => res.json())
      .then(data => setCat(data))
      .catch(err => console.error(err))
  }, [slug])

  if (!cat) return <p>Loading...</p>
  if (cat.error) return <p>Cat not found</p>

  return (
    <div className="main-box text-center shadow-sm">
      <h1>{cat.name}</h1>
      <img src={`http://localhost:5000${cat.image}`} alt={cat.name} />
      <p><strong>Location:</strong> {cat.location}</p>
      <p><strong>Likes:</strong> {cat.likes.join(', ')}</p>
      <p><strong>Sex:</strong> {cat.sex}</p>
      <p><strong>Graduated:</strong> {cat.graduated ? 'Yes' : 'No'}</p>
      <p><strong>Prediction Count:</strong> {cat.predictionCount}</p>
    </div>
  )
}
