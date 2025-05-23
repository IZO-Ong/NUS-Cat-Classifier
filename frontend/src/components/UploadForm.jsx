import { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'

export default function UploadForm({ imagePreview, setImagePreview, setPrediction, setLoading, setPendingFile }) {
  const [dragActive, setDragActive] = useState(false)

  const handleSelect = (file) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)  // base64 string
      setPendingFile(file)
      setPrediction(null)
    }
    reader.readAsDataURL(file)
    setPendingFile(file)
    setPrediction(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) handleSelect(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) handleSelect(file)
  }

  return (
    <Form.Group controlId="formFile" className="mb-3">
      <div
        className={`drop-zone ${dragActive ? 'active' : ''}`}
        onDrop={handleDrop}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={() => setDragActive(false)}
      >
        <div className="upload-row">
          <span className="fw-bold fs-5">
            {imagePreview ? 'Upload another image:' : 'Upload your cat image here:'}
          </span>
          <label className="custom-browse">
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden-file-input"
            />
            Browse
          </label>
        </div>
        <p className="text-muted small">Or drag and drop image here</p>
      </div>
    </Form.Group>
  )
}
