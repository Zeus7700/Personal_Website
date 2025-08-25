import { createClient } from 'redis'

let redis: ReturnType<typeof createClient> | null = null

async function getRedisClient() {
  if (!redis) {
    redis = createClient({
      url: process.env.REDIS_URL
    })
    await redis.connect()
  }
  return redis
}

export interface VoteData {
  likes: number
  dislikes: number
}

export async function getVoteCounts(slug: string): Promise<VoteData> {
  try {
    const client = await getRedisClient()
    const likes = await client.get(`votes:${slug}:likes`) || '0'
    const dislikes = await client.get(`votes:${slug}:dislikes`) || '0'
    return { 
      likes: parseInt(likes), 
      dislikes: parseInt(dislikes) 
    }
  } catch (error) {
    console.error('Error getting vote counts:', error)
    return { likes: 0, dislikes: 0 }
  }
}

export async function updateVote(slug: string, vote: 'like' | 'dislike', action: 'add' | 'remove'): Promise<VoteData> {
  try {
    const client = await getRedisClient()
    const key = `votes:${slug}:${vote}s`
    
    if (action === 'add') {
      // Increment the selected vote
      await client.incr(key)
      
      // Decrement the opposite vote if it exists
      const oppositeKey = `votes:${slug}:${vote === 'like' ? 'dislikes' : 'likes'}`
      const oppositeCount = await client.get(oppositeKey) || '0'
      if (parseInt(oppositeCount) > 0) {
        await client.decr(oppositeKey)
      }
    } else {
      // Decrement the vote
      const count = await client.get(key) || '0'
      if (parseInt(count) > 0) {
        await client.decr(key)
      }
    }
    
    return await getVoteCounts(slug)
  } catch (error) {
    console.error('Error updating vote:', error)
    return { likes: 0, dislikes: 0 }
  }
}
