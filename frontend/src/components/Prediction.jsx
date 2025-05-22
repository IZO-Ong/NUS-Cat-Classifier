export default function Prediction({ prediction }) {
  if (!prediction) return null

  return (
    <h2 style={{ marginTop: '1rem' }}>Prediction: {prediction}</h2>
  )
}
