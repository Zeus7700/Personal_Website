'use client'

import { useEffect } from 'react'
import axios from 'axios'

interface ViewTrackerProps {
  postSlug: string
}

export function ViewTracker({ postSlug }: ViewTrackerProps) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        // Check if this view has already been counted for this session
        const viewKey = `view-${postSlug}`
        const hasViewed = sessionStorage.getItem(viewKey)
        
        if (!hasViewed) {
          // Increment view count
          await axios.post(`/api/posts/${postSlug}/views`)
          
          // Mark as viewed for this session
          sessionStorage.setItem(viewKey, 'true')
        }
      } catch (error) {
        console.error('Error incrementing view count:', error)
      }
    }

    incrementView()
  }, [postSlug])

  // This component doesn't render anything
  return null
}
