"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Games", href: "/games" },
  { name: "Progress", href: "/progress" },
]

export function Navigation() {
  const pathname = usePathname()

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
    </nav>
  )
} 