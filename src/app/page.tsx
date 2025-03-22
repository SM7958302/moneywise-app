"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const games = [
  {
    id: "budget-hero",
    title: "Budget Hero",
    description: "Master budgeting skills by managing virtual finances",
    difficulty: "easy",
    color: "bg-green-500"
  },
  {
    id: "market-master",
    title: "Market Master",
    description: "Learn investment strategies through simulated trading",
    difficulty: "medium",
    color: "bg-blue-500"
  },
  {
    id: "savings-quest",
    title: "Savings Quest",
    description: "Complete challenges to build smart saving habits",
    difficulty: "easy",
    color: "bg-purple-500"
  }
]

const tools = [
  {
    id: "compound-calculator",
    title: "Compound Interest Calculator",
    description: "See how your money grows over time",
    color: "bg-yellow-500"
  },
  {
    id: "budget-planner",
    title: "Budget Planner",
    description: "Plan and track your monthly expenses",
    color: "bg-pink-500"
  }
]

export default function HomePage() {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    fetch("/welcome")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGreeting(data.message)
        } else {
          setGreeting("Welcome to MoneyWise! Let's learn about finance together!")
        }
      })
      .catch(() => {
        setGreeting("Welcome to MoneyWise! Let's learn about finance together!")
      })
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            MoneyWise
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {greeting}
          </p>
        </motion.div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Financial Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <motion.div
                key={game.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/games/${game.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className={`w-full h-32 rounded-t-lg ${game.color} mb-4`} />
                      <CardTitle>{game.title}</CardTitle>
                      <CardDescription>{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        Difficulty: {game.difficulty}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Financial Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <motion.div
                key={tool.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/tools/${tool.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className={`w-full h-32 rounded-t-lg ${tool.color} mb-4`} />
                      <CardTitle>{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
