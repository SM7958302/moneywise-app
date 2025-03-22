import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { createClient } from '@vercel/edge-config'

const edgeConfig = createClient('https://edge-config.vercel.com/ecfg_xzqn3n35q9nmhvxzyncg5swyca2n?token=3c4d05a7-630c-4d83-afc1-5fc3641f3639')

export default withAuth(
  async function middleware(req) {
    // Handle /welcome route separately
    if (req.nextUrl.pathname === '/welcome') {
      const greeting = await edgeConfig.get('greeting')
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