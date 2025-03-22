"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGame } from "@/context/GameContext"
import { achievements } from "@/lib/game-data"

export function AchievementsPanel() {
  const { progress, getCurrentLevel } = useGame()
  const { title: levelTitle, progress: levelProgress } = getCurrentLevel()

  const allAchievements = [
    ...achievements.budgeting,
    ...achievements.investing,
    ...achievements.learning
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full max-w-sm space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-lg font-medium">{levelTitle}</p>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {progress.xp} XP Total
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {allAchievements.map(achievement => {
              const isUnlocked = progress.achievements.includes(achievement.id)
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${
                    isUnlocked
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <h3 className="font-medium">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  <p className="text-sm font-medium mt-2">
                    {isUnlocked ? "Unlocked!" : `+${achievement.xp} XP`}
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm">
                💡 Tip of the day: Start small with savings - even $5 a week adds up
                over time!
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm">
                🎯 Goal: Complete one financial lesson today to earn XP and level up!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 