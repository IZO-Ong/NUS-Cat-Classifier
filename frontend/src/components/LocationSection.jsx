import CatCard from './CatCard'

export default function LocationSection({ loc, group }) {
  const classNameSafe = loc.toLowerCase().replace(/[^a-z0-9]/g, '-')

  return (
    <div className={`location-group themed-group themed-${classNameSafe}`}>
      <h3>{loc}</h3>
      <div className="cat-grid">
        {group.map((cat, index) => (
          <CatCard key={cat.slug} cat={cat} delay={index * 100} />
        ))}
      </div>
    </div>
  )
}
