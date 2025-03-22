import { NextResponse } from "next/server"
import { createClient } from '@vercel/edge-config'
import { NextRequest } from "next/server"

const edgeConfig = createClient('https://edge-config.vercel.com/ecfg_xzqn3n35q9nmhvxzyncg5swyca2n?token=3c4d05a7-630c-4d83-afc1-5fc3641f3639')

export async function middleware(req: NextRequest) {
  // Handle /welcome route
  if (req.nextUrl.pathname === '/welcome') {
    const greeting = await edgeConfig.get('greeting')
    return NextResponse.json(greeting)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/welcome"]
} 