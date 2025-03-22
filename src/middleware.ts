import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { get } from '@vercel/edge-config'

export default withAuth(
  function middleware(req) {
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

export async function middleware() {
  const greeting = await get('greeting')
  return NextResponse.json(greeting)
} 