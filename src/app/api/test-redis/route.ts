import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'redis'

export async function GET() {
  try {
    // Check environment variable
    const redisUrl = process.env.REDIS_URL
    if (!redisUrl) {
      return NextResponse.json({ 
        success: false, 
        error: 'REDIS_URL environment variable not set',
        envVars: Object.keys(process.env).filter(key => key.includes('REDIS'))
      })
    }

    // Test Redis connection
    const client = createClient({
      url: redisUrl
    })
    
    await client.connect()
    
    // Test basic operations
    await client.set('test-redis', 'Hello from Redis!')
    const value = await client.get('test-redis')
    
    await client.disconnect()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Redis connection working!',
      testValue: value,
      redisUrl: redisUrl.substring(0, 20) + '...' // Show partial URL for security
    })
  } catch (error) {
    console.error('Redis test error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Redis connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      redisUrl: process.env.REDIS_URL ? 'Set' : 'Not set'
    }, { status: 500 })
  }
}
