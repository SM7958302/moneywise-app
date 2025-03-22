import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: ["/learn/:path*", "/games/:path*", "/tools/:path*", "/progress/:path*"],
} 