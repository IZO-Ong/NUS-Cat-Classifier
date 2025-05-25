export default function CommentItem({ comment, token, username, onLike }) {
  const liked = comment.likes.includes(username)

  return (
    <li className="comment-item">
      <div className="comment-top">
        <div>
          <strong>{comment.username}</strong> · <small>{new Date(comment.timestamp).toLocaleString()}</small>
          <p>{comment.content}</p>
        </div>
        <div>
          <button
            onClick={() => onLike(comment._id)}
            disabled={!token || liked}
            className="like-button"
          >
            ❤️ {comment.likes.length}
          </button>
        </div>
      </div>
    </li>
  )
}
