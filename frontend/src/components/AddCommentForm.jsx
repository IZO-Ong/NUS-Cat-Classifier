import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import '../styles/CommentSection.css'

export default function AddCommentForm({ slug, token, username, onCommentAdded }) {
  const [text, setText] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const API_BASE = import.meta.env.VITE_API_URL || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return setError('Comment cannot be empty.')
    if (!token) return setError('Please log in to post a comment.')

    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/api/cats/${slug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: text })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to post comment.')
      } else {
        setText('')
        onCommentAdded()
      }
    } catch {
      setError('Something went wrong. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-input"
        placeholder={token ? "Write a comment..." : "Log in to post a comment."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!token || loading}
        rows={3}
      />
      <div className="comment-actions">
        {error && <div className="comment-error">{error}</div>}
        <Button type="submit" variant="primary" disabled={!token || loading}>
          {loading ? 'Posting...' : 'Post'}
        </Button>
      </div>
    </form>
  )
}
