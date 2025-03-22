"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Learn", href: "/learn" },
  { name: "Games", href: "/games" },
  { name: "Tools", href: "/tools" },
  { name: "Progress", href: "/progress" },
]

export function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4 lg:space-x-6">
        {navigation.map((item) => (
          <Button
            key={item.name}
            asChild
            variant={pathname === item.href ? "default" : "ghost"}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href
                ? "text-white"
                : "text-muted-foreground"
            )}
          >
            <Link href={item.href}>{item.name}</Link>
          </Button>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/progress">My Progress</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
} 