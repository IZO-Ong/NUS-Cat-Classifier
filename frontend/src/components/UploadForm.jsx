import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function UploadForm({ setImagePreview, setPrediction, setLoading }) {
  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImagePreview(URL.createObjectURL(file))
    setPrediction(null)
    setLoading(true)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      setPrediction(data.prediction)
    } catch {
      setPrediction('Error fetching prediction')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form.Group controlId="formFile" className="mb-3">
      <div>
        <label className="fw-bold fs-5 d-block mb-2">
          Upload a cat image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="custom-file-input"
        />
      </div>
    </Form.Group>
  )
}
