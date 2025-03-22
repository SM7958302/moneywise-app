import { createClient } from '@vercel/edge-config'
import { NextResponse } from 'next/server'

const edgeConfig = createClient('https://edge-config.vercel.com/ecfg_xzqn3n35q9nmhvxzyncg5swyca2n?token=3c4d05a7-630c-4d83-afc1-5fc3641f3639')

export async function POST(request: Request) {
  try {
    const { greeting } = await request.json()
    await edgeConfig.set('greeting', greeting)
    return NextResponse.json({ message: 'Greeting updated successfully' })
  } catch (error) {
    console.error('Error setting greeting:', error)
    return NextResponse.json(
      { error: 'Failed to set greeting' },
      { status: 500 }
    )
  }
} 