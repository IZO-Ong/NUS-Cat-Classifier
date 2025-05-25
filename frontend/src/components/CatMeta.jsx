export default function CatMeta({ cat }) {
  return (
    <div className="cat-meta-row">
      <p><strong>Likes:</strong> {cat.likes.join(', ') || 'N/A'}</p>
      <p><strong>Sex:</strong> {cat.sex}</p>
      {cat.graduated && <p className="graduated-note">🎓 This cat has graduated!</p>}
    </div>
  )
}
