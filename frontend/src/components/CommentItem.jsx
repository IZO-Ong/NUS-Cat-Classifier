import { formatDistanceToNow } from 'date-fns'

export default function CommentItem({ comment, token, onToggleLike, onDelete }) {
  const userID = localStorage.getItem('userID') || sessionStorage.getItem('userID')
  const liked = comment.likes.includes(userID)
  const isAuthor = comment.userID === userID

  const handleClick = () => {
    if (!token || !userID) return
    onToggleLike(comment._id, liked)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      onDelete(comment._id)
    }
  }

  return (
    <li className="comment-item">
      <div className="comment-top">
        <div>
          <strong>{comment.username}</strong> ·{' '}
          <small>{formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}</small>
          <p>{comment.content}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            onClick={handleClick}
            disabled={!token}
            className={`like-button ${liked ? 'liked' : ''}`}
          >
            ❤️ {comment.likes.length}
          </button>

          {isAuthor && (
            <button
              className="delete-button"
              onClick={handleDelete}
              style={{ background: '#fecaca', color: '#b91c1c', border: 'none', borderRadius: '999px', padding: '0.4rem 0.8rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              🗑 Delete
            </button>
          )}
        </div>
      </div>
    </li>
  )
}
