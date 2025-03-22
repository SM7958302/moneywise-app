"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

const games = [
  {
    id: "budget-master",
    title: "Budget Master",
    description: "Test your budgeting skills in this interactive simulation",
    difficulty: "Beginner",
    timeToComplete: "15 mins",
    skills: ["Budgeting", "Decision Making", "Financial Planning"],
    details: "Manage a monthly budget, make spending decisions, and learn to save effectively.",
    instructions: "You'll be given a monthly income and various expenses to manage. Make smart decisions to save money and achieve your financial goals."
  },
  {
    id: "investment-challenge",
    title: "Investment Challenge",
    description: "Learn investment strategies through market simulation",
    difficulty: "Intermediate",
    timeToComplete: "20 mins",
    skills: ["Investment", "Risk Management", "Portfolio Building"],
    details: "Experience stock market simulation and build your investment portfolio.",
    instructions: "Start with a virtual portfolio and make investment decisions. Learn about different investment options and risk management strategies."
  },
  {
    id: "debt-destroyer",
    title: "Debt Destroyer",
    description: "Strategy game to understand debt management",
    difficulty: "Beginner",
    timeToComplete: "10 mins",
    skills: ["Debt Management", "Interest Calculation", "Financial Strategy"],
    details: "Learn to manage and eliminate debt through strategic decision-making.",
    instructions: "You have multiple debts with different interest rates. Develop a strategy to pay them off efficiently while managing your monthly budget."
  },
  {
    id: "savings-quest",
    title: "Savings Quest",
    description: "Adventure game focused on saving strategies",
    difficulty: "Beginner",
    timeToComplete: "15 mins",
    skills: ["Saving", "Goal Setting", "Financial Discipline"],
    details: "Embark on a quest to reach savings goals while overcoming spending temptations.",
    instructions: "Navigate through different scenarios and make choices that affect your savings. Learn to prioritize needs over wants and build good saving habits."
  }
]

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<typeof games[0] | null>(null)

  const startGame = (game: typeof games[0]) => {
    setSelectedGame(game)
    // In a real application, this would initialize and start the game
    toast.success(`Starting ${game.title}...`)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Financial Games</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {game.title}
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Info
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">Game Details</h4>
                        <p className="text-sm">{game.details}</p>
                        <div className="flex items-center pt-2">
                          <span className="text-xs text-muted-foreground">
                            Skills: {game.skills.join(", ")}
                          </span>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">
                    Difficulty: {game.difficulty}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Time: {game.timeToComplete}
                  </span>
                </div>
                <Button className="w-full" onClick={() => startGame(game)}>
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedGame} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedGame?.title}</DialogTitle>
            <DialogDescription>
              {selectedGame?.instructions}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Time to complete: {selectedGame?.timeToComplete}
            </p>
            <p className="text-sm text-muted-foreground">
              Difficulty: {selectedGame?.difficulty}
            </p>
            <Button className="w-full" onClick={() => setSelectedGame(null)}>
              Start Game
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
} 