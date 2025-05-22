export default function Preview({ imagePreview }) {
  if (!imagePreview) return null

  return (
    <div style={{ marginTop: '1rem' }}>
      <img src={imagePreview} alt="Preview" width={300} />
    </div>
  )
}
