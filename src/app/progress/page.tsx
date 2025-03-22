"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const achievements = [
  {
    name: "Budget Master",
    description: "Complete your first budgeting exercise",
    progress: 100,
    completed: true,
    date: "2024-03-22"
  },
  {
    name: "Savings Star",
    description: "Set up your first savings goal",
    progress: 60,
    completed: false
  },
  {
    name: "Investment Rookie",
    description: "Learn the basics of investment",
    progress: 30,
    completed: false
  },
  {
    name: "Debt Destroyer",
    description: "Create a debt payment plan",
    progress: 0,
    completed: false
  }
]

const stats = {
  lessonsCompleted: 5,
  gamesPlayed: 3,
  totalPoints: 250,
  streak: 4
}

export default function ProgressPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="flex items-center gap-6 mb-8">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/avatar.png" alt="User" />
            <AvatarFallback>FW</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold">Your Progress</h1>
            <p className="text-muted-foreground">Keep learning and earning achievements!</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Lessons Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lessonsCompleted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Games Played
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.gamesPlayed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPoints}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Day Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.streak}</div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <Card key={achievement.name} className={achievement.completed ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle className="text-lg">{achievement.name}</CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={achievement.progress} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {achievement.progress}% Complete
                    </span>
                    {achievement.completed && (
                      <span className="text-primary">
                        Completed {achievement.date}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
} 