import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { createClient } from '@vercel/edge-config'

export default withAuth(
  async function middleware(req) {
    // Handle /welcome route separately
    if (req.nextUrl.pathname === '/welcome') {
      const config = createClient(process.env.EDGE_CONFIG)
      const greeting = await config.get('greeting')
      return NextResponse.json(greeting)
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/learn/:path*",
    "/profile/:path*",
    "/progress/:path*",
    "/games/:path*",
    "/api/progress/:path*",
    "/api/games/:path*",
    "/api/chat/:path*",
    "/welcome"
  ]
} 