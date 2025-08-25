import { kv } from '@vercel/kv'

export interface ViewData {
  views: number
}

export interface VoteData {
  likes: number
  dislikes: number
}

export async function getViewCount(slug: string): Promise<number> {
  try {
    const count = await kv.get<number>(`views:${slug}`)
    return count || 0
  } catch (error) {
    console.error('Error getting view count:', error)
    return 0
  }
}

export async function incrementViewCount(slug: string): Promise<number> {
  try {
    const count = await kv.incr(`views:${slug}`)
    return count
  } catch (error) {
    console.error('Error incrementing view count:', error)
    return 0
  }
}

export async function getVoteCounts(slug: string): Promise<VoteData> {
  try {
    const likes = await kv.get<number>(`votes:${slug}:likes`) || 0
    const dislikes = await kv.get<number>(`votes:${slug}:dislikes`) || 0
    return { likes, dislikes }
  } catch (error) {
    console.error('Error getting vote counts:', error)
    return { likes: 0, dislikes: 0 }
  }
}

export async function updateVote(slug: string, vote: 'like' | 'dislike', action: 'add' | 'remove'): Promise<VoteData> {
  try {
    const key = `votes:${slug}:${vote}s`
    
    if (action === 'add') {
      // Increment the selected vote
      await kv.incr(key)
      
      // Decrement the opposite vote if it exists
      const oppositeKey = `votes:${slug}:${vote === 'like' ? 'dislikes' : 'likes'}`
      const oppositeCount = await kv.get<number>(oppositeKey) || 0
      if (oppositeCount > 0) {
        await kv.decr(oppositeKey)
      }
    } else {
      // Decrement the vote
      const count = await kv.get<number>(key) || 0
      if (count > 0) {
        await kv.decr(key)
      }
    }
    
    return await getVoteCounts(slug)
  } catch (error) {
    console.error('Error updating vote:', error)
    return { likes: 0, dislikes: 0 }
  }
}
