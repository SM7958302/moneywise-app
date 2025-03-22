import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  try {
    // Handle /welcome route
    if (req.nextUrl.pathname === '/welcome') {
      return NextResponse.json({
        message: "Welcome to MoneyWise! Let's learn about finance together!",
        success: true
      })
    }
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    )
  }
}

export const config = {
  matcher: ["/welcome"]
} 