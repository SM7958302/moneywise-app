"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Interactive Learning",
    description: "Learn financial concepts through engaging interactive modules and real-world scenarios.",
    href: "/learn"
  },
  {
    title: "Financial Games",
    description: "Play fun games that teach budgeting, investing, and money management skills.",
    href: "/games"
  },
  {
    title: "Smart Tools",
    description: "Use AI-powered calculators and tools to make informed financial decisions.",
    href: "/tools"
  },
  {
    title: "Track Progress",
    description: "Monitor your learning journey and earn rewards as you master new skills.",
    href: "/progress"
  }
]

export default function HomePage() {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    fetch("/welcome")
      .then(res => res.json())
      .then(data => setGreeting(data))
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          MoneyWise
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          {greeting || "Welcome to MoneyWise! Let's learn about finance together!"}
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/games"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Start Playing
          </Link>
          <Link
            href="/learn"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-secondary-foreground bg-secondary rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Start Learning
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
