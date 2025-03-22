"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGame } from "@/context/GameContext"

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
  const { progress } = useGame()

  const stats = {
    gamesCompleted: progress.completedScenarios.length,
    totalXP: progress.xp,
    totalGames: achievements.length,
    completionPercentage: (progress.completedScenarios.length / achievements.length) * 100
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Your Progress</h1>
          <p className="text-muted-foreground">Track your financial learning journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Games Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.gamesCompleted} / {stats.totalGames}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalXP}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.completionPercentage)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <h2 className="text-2xl font-bold mb-4">Game Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const isCompleted = progress.completedScenarios.includes(achievement.id);
            return (
              <Card key={achievement.id} className={isCompleted ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle className="text-lg">{achievement.name}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={isCompleted ? 100 : 0} className="h-2" />
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