"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useGame } from "@/context/GameContext"
import { ShareButton } from "@/components/ui/share-button"
import { achievements } from "@/lib/game-data"

export function AchievementsPanel() {
  const { progress, getCurrentLevel } = useGame()
  const { title: levelTitle, progress: levelProgress } = getCurrentLevel()

  const allAchievements = [
    ...achievements.budgeting,
    ...achievements.investing,
    ...achievements.learning
  ]

  const getAchievementDetails = (id: string) => {
    return allAchievements.find(a => a.id === id)
  }

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
          <div className="flex items-center justify-between">
            <CardTitle>Achievements</CardTitle>
            {progress.achievements.length > 0 && (
              <ShareButton
                title="My MoneyWise Achievements!"
                text={`I've earned ${progress.achievements.length} achievements and ${progress.xp} XP in MoneyWise! 🏆`}
              />
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {progress.achievements.length} earned
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {allAchievements.map(achievement => {
            const isUnlocked = progress.achievements.includes(achievement.id)
            return (
              <Card 
                key={achievement.id} 
                className={isUnlocked ? "border-primary" : "opacity-75"}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={isUnlocked ? "default" : "secondary"}>
                          {achievement.xp} XP
                        </Badge>
                        {isUnlocked && (
                          <ShareButton
                            title={`I earned the ${achievement.title} achievement in MoneyWise! 🎉`}
                            text={`${achievement.description} (${achievement.xp} XP)`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
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