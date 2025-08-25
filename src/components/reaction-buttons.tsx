'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

interface ReactionButtonsProps {
  postSlug: string
}

interface VoteCounts {
  likes: number
  dislikes: number
}

interface ViewData {
  views: number
}

export function ReactionButtons({ postSlug }: ReactionButtonsProps) {
  const [voteCounts, setVoteCounts] = useState<VoteCounts>({ likes: 0, dislikes: 0 })
  const [viewData, setViewData] = useState<ViewData>({ views: 0 })
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load initial vote counts, view data, and user's previous vote
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load vote counts
        const countsResponse = await axios.get(`/api/posts/${postSlug}/votes`)
        setVoteCounts(countsResponse.data)

        // Load view data
        const viewsResponse = await axios.get(`/api/posts/${postSlug}/views`)
        setViewData(viewsResponse.data)

        // Load user's previous vote from localStorage
        const savedVote = localStorage.getItem(`vote-${postSlug}`)
        if (savedVote === 'like' || savedVote === 'dislike') {
          setUserVote(savedVote)
        }
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [postSlug])

  const handleVote = async (voteType: 'like' | 'dislike') => {
    if (isLoading) return

    setIsLoading(true)
    
    try {
      const action = userVote === voteType ? 'remove' : 'add'
      
      const response = await axios.post(`/api/posts/${postSlug}/vote`, {
        vote: voteType,
        action
      })

      setVoteCounts(response.data)
      
      // Update user's vote
      if (userVote === voteType) {
        // User is unvoting
        setUserVote(null)
        localStorage.removeItem(`vote-${postSlug}`)
      } else {
        // User is voting or changing vote
        setUserVote(voteType)
        localStorage.setItem(`vote-${postSlug}`, voteType)
      }
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-3">
      {/* Views Counter */}
      <div className="flex items-center gap-2 text-[var(--text-muted)]">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span className="text-sm font-medium">{viewData.views}</span>
      </div>

      {/* Reaction Buttons */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => handleVote('like')}
          disabled={isLoading}
          className={`flex items-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)] ${
            userVote === 'like'
              ? 'text-[var(--accent)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
          }`}
          aria-label="Like this post"
        >
          <svg
            className="w-5 h-5"
            fill={userVote === 'like' ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          <span className="text-sm font-medium">{voteCounts.likes}</span>
        </button>

        <button
          onClick={() => handleVote('dislike')}
          disabled={isLoading}
          className={`flex items-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)] ${
            userVote === 'dislike'
              ? 'text-[var(--accent)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
          }`}
          aria-label="Dislike this post"
        >
          <svg
            className="w-5 h-5"
            fill={userVote === 'dislike' ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2"
            />
          </svg>
          <span className="text-sm font-medium">{voteCounts.dislikes}</span>
        </button>
      </div>
    </div>
  )
}
