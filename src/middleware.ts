import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Handle /welcome route
  if (req.nextUrl.pathname === '/welcome') {
    return NextResponse.json("Welcome to MoneyWise! Let's learn about finance together!")
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/welcome"]
} 