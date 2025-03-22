"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

const games = [
  {
    title: "Budget Master",
    description: "Test your budgeting skills in this interactive simulation",
    difficulty: "Beginner",
    timeToComplete: "15 mins",
    skills: ["Budgeting", "Decision Making", "Financial Planning"],
    details: "Manage a monthly budget, make spending decisions, and learn to save effectively."
  },
  {
    title: "Investment Challenge",
    description: "Learn investment strategies through market simulation",
    difficulty: "Intermediate",
    timeToComplete: "20 mins",
    skills: ["Investment", "Risk Management", "Portfolio Building"],
    details: "Experience stock market simulation and build your investment portfolio."
  },
  {
    title: "Debt Destroyer",
    description: "Strategy game to understand debt management",
    difficulty: "Beginner",
    timeToComplete: "10 mins",
    skills: ["Debt Management", "Interest Calculation", "Financial Strategy"],
    details: "Learn to manage and eliminate debt through strategic decision-making."
  },
  {
    title: "Savings Quest",
    description: "Adventure game focused on saving strategies",
    difficulty: "Beginner",
    timeToComplete: "15 mins",
    skills: ["Saving", "Goal Setting", "Financial Discipline"],
    details: "Embark on a quest to reach savings goals while overcoming spending temptations."
  }
]

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Financial Games</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
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
                <Button className="w-full">Play Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
} 