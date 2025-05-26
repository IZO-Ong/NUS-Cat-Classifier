import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import CatHeader from '../components/CatHeader'
import CatMeta from '../components/CatMeta'
import CommentsSection from '../components/CommentsSection'
import '../styles/CatDetail.css'
import '../styles/CommentSection.css'

export default function CatDetail() {
  const { slug } = useParams()
  const [fadeVisible, setFadeVisible] = useState(false)
  const [sortOption, setSortOption] = useState('recent')
  const queryClient = useQueryClient()
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  const username = localStorage.getItem('username') || sessionStorage.getItem('username')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeVisible(true)
    }, 10)
    return () => clearTimeout(timeout)
  }, [])

  const {
    data: cat,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cat', slug],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/cats/${slug}`)
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
    retry: 1,
  })

  const {
    data: comments = [],
    refetch: refetchComments
  } = useQuery({
    queryKey: ['comments', slug],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/cats/${slug}/comments`)
      if (!res.ok) throw new Error('Failed to fetch comments')
      return res.json()
    }
  })

  const likeComment = useMutation({
    mutationFn: async (commentId) => {
      await fetch(`http://localhost:5000/api/comments/${commentId}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess: () => refetchComments()
  })

  if (isLoading) {
    return (
      <div className="status-wrapper">
        <div className="status-message loading">Loading cat info...</div>
      </div>
    )
  }

  if (isError || cat?.error) {
    return (
      <div className="status-wrapper">
        <div className="status-message error">😿 No cats found matching that name.</div>
      </div>
    )
  }

  return (
    <div className={`main-box fade-ready ${fadeVisible ? 'fade-in' : ''}`}>
      <div className="cat-detail-container">
        <CatHeader cat={cat} />
        <CatMeta cat={cat} />
        <CommentsSection
          comments={comments}
          token={token}
          username={username}
          onLike={(id) => likeComment.mutate(id)}
          sortOption={sortOption}
          setSortOption={setSortOption}
          slug={slug}
          refetchComments={refetchComments}
        />
      </div>
    </div>
  )
}
