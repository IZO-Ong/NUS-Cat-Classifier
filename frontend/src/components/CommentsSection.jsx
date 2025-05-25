import CommentItem from './CommentItem'

export default function CommentsSection({ comments, token, username, onLike, sortOption, setSortOption }) {
  const sorted = [...comments].sort((a, b) =>
    sortOption === 'liked'
      ? b.likes.length - a.likes.length
      : new Date(b.timestamp) - new Date(a.timestamp)
  )

  return (
    <div className="cat-comments">
      <h3>Comments</h3>
      <div className="comment-sort">
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="recent">Most Recent</option>
          <option value="liked">Most Liked</option>
        </select>
      </div>

      {!token && <p className="no-comments">🔒 Please log in to post or like comments.</p>}
      {sorted.length === 0
        ? <p className="no-comments">No comments yet.</p>
        : (
          <ul className="comment-list">
            {sorted.map(comment => (
              <CommentItem key={comment._id} comment={comment} token={token} username={username} onLike={onLike} />
            ))}
          </ul>
        )
      }
    </div>
  )
}
