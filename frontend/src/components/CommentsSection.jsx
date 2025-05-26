import CommentItem from './CommentItem'
import AddCommentForm from './AddCommentForm'
import Dropdown from 'react-bootstrap/Dropdown'
import { useMutation } from '@tanstack/react-query'

export default function CommentsSection({ comments, token, username, sortOption, setSortOption, slug, refetchComments }) {

  const API_BASE = import.meta.env.VITE_API_URL || ''

  const toggleLike = useMutation({
    mutationFn: async ({ id, liked }) => {
      const endpoint = liked ? 'unlike' : 'like'
      await fetch(`${API_BASE}/api/comments/${id}/${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
    },
    onSuccess: () => refetchComments()
  })

  const deleteComment = useMutation({
    mutationFn: async (id) => {
      await fetch(`${API_BASE}/api/comments/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess: () => refetchComments()
  })

  const sorted = [...comments].sort((a, b) =>
    sortOption === 'liked'
      ? b.likes.length - a.likes.length
      : new Date(b.timestamp) - new Date(a.timestamp)
  )

  return (
    <div className="cat-comments">
      <div className="comment-header d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Comments</h3>
        <Dropdown>
          <Dropdown.Toggle variant="light" className="text-capitalize">
            {sortOption === 'recent' ? 'Most Recent' : 'Most Liked'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSortOption('recent')}>
              Most Recent
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOption('liked')}>
              Most Liked
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <AddCommentForm
        slug={slug}
        token={token}
        username={username}
        onCommentAdded={refetchComments}
      />

      {!token && <p className="no-comments">🔒 Please log in to post or like comments.</p>}
      {comments.length > 0 && (
        <p className="comment-count">💬 {comments.length} Comment{comments.length !== 1 && 's'}</p>
      )}
      {sorted.length === 0
        ? <p className="no-comments">No comments yet.</p>
        : (
          <ul className="comment-list">
            {sorted.map(comment => (
              <CommentItem
                key={comment._id}
                comment={comment}
                token={token}
                onToggleLike={(id, liked) => toggleLike.mutate({ id, liked })}
                onDelete={(id) => deleteComment.mutate(id)}
              />
            ))}
          </ul>
        )
      }
    </div>
  )
}
