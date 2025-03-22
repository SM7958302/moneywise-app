"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGame } from "@/context/GameContext"

const games = [
  {
    id: "budget-hero",
    title: "Budget Hero",
    description: "Master the art of budgeting and financial planning",
    difficulty: "Beginner",
    color: "bg-green-100",
    icon: "💰",
    href: "/games/budget-hero"
  },
  {
    id: "market-master",
    title: "Market Master",
    description: "Learn about investing and stock markets",
    difficulty: "Intermediate",
    color: "bg-blue-100",
    icon: "📈",
    href: "/games/market-master"
  },
  {
    id: "savings-quest",
    title: "Savings Quest",
    description: "Build smart saving habits through challenges",
    difficulty: "Beginner",
    color: "bg-purple-100",
    icon: "🎯",
    href: "/games/savings-quest"
  }
]

export default function GamesPage() {
  const { progress } = useGame()

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Financial Games</h1>
          <p className="text-muted-foreground">
            Learn financial skills through interactive games
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(game => {
            const isCompleted = progress.completedScenarios.includes(game.id)
            
            return (
              <Link key={game.id} href={game.href}>
                <Card className={`h-full cursor-pointer transition-all hover:shadow-md ${game.color}`}>
                  <CardHeader>
                    <div className="text-3xl mb-2">{game.icon}</div>
                    <CardTitle className="flex justify-between items-center">
                      <span>{game.title}</span>
                      {isCompleted && (
                        <span className="text-green-600 text-sm">✓ Completed</span>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {game.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Difficulty: {game.difficulty}
                      </span>
                      <Button variant="secondary" size="sm">
                        Play Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Gaming Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Games Completed</p>
                  <p className="text-2xl font-bold">
                    {progress.completedScenarios.length} / {games.length}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Total XP</p>
                  <p className="text-2xl font-bold">{progress.xp}</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm">
                  💡 Tip: Complete all games to unlock special achievements and
                  become a financial master!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 