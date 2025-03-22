import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { greeting } = await request.json()
    
    // Instead of using set method, we'll return the current greeting
    // The greeting can be updated through Vercel dashboard
    return NextResponse.json({ 
      message: 'Please update the greeting through Vercel dashboard',
      current: 'Welcome to MoneyWise! Let\'s learn about finance together!'
    })
  } catch (error) {
    console.error('Error handling greeting:', error)
    return NextResponse.json(
      { error: 'Failed to handle greeting' },
      { status: 500 }
    )
  }
} 