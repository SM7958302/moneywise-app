"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGame } from "@/context/GameContext"
import { cn } from "@/lib/utils"

const achievements = [
  {
    id: "budget-hero",
    name: "Budget Master",
    description: "Complete the Budget Hero game",
    xp: 100,
  },
  {
    id: "market-master",
    name: "Market Master",
    description: "Complete the Market Master game",
    xp: 150,
  },
  {
    id: "savings-quest",
    name: "Savings Star",
    description: "Complete the Savings Quest game",
    xp: 100,
  }
]

export default function ProgressPage() {
  const { progress, xp } = useGame()

  const stats = {
    gamesCompleted: progress.completedScenarios.length,
    totalXP: xp,
    totalGames: achievements.length,
    completionPercentage: (progress.completedScenarios.length / achievements.length) * 100
  }

  const calculateProgress = (category: string) => {
    const completed = progress.completedScenarios.filter(item => item === category).length
    const total = achievements.filter(item => item.id === category).length
    return Math.min(100, (completed / total) * 100)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground">Your Progress</h1>
          <p className="text-muted-foreground">Track your financial learning journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Games Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.gamesCompleted} / {stats.totalGames}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Total XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalXP}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{Math.round(stats.completionPercentage)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <h2 className="text-2xl font-bold mb-4 text-foreground">Game Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const isCompleted = progress.completedScenarios.includes(achievement.id);
            return (
              <Card key={achievement.id} className={cn("bg-card border-border", isCompleted ? "border-primary" : "")}>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">{achievement.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={calculateProgress(achievement.id)} className="h-2 bg-secondary" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {isCompleted ? "Completed" : "Not started"}
                      </span>
                      <span className={isCompleted ? "text-primary" : "text-muted-foreground"}>
                        {achievement.xp} XP {isCompleted ? "Earned" : "Available"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
} 