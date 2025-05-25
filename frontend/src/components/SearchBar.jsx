export default function SearchBar({ query, setQuery }) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search for a cat..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
