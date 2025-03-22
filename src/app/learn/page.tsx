"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGame } from "@/context/GameContext"
import { learningModules } from "@/lib/game-data"
import { LearningModule } from "@/components/learning/LearningModule"

export default function LearnPage() {
  const { progress } = useGame()
  const [selectedModule, setSelectedModule] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Learn Financial Skills</h1>
          <p className="text-muted-foreground">
            Master your finances through interactive lessons and quizzes
          </p>
        </div>

        {selectedModule ? (
          <>
            <Button
              onClick={() => setSelectedModule(null)}
              variant="outline"
              className="mb-4"
            >
              ← Back to Modules
            </Button>
            <LearningModule moduleId={selectedModule} />
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningModules.map(module => {
              const completedLessons = module.lessons.filter(lesson =>
                progress.completedLessons.includes(lesson.id)
              ).length
              const totalLessons = module.lessons.length
              const isComplete = completedLessons === totalLessons

              return (
                <Card
                  key={module.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isComplete ? "bg-green-50" : ""
                  }`}
                  onClick={() => setSelectedModule(module.id)}
                >
                  <CardHeader>
                    <CardTitle>{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        {completedLessons} of {totalLessons} lessons completed
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{
                            width: `${(completedLessons / totalLessons) * 100}%`
                          }}
                        />
                      </div>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {module.lessons.map(lesson => (
                          <li
                            key={lesson.id}
                            className={
                              progress.completedLessons.includes(lesson.id)
                                ? "text-green-600"
                                : ""
                            }
                          >
                            {lesson.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Total Lessons Completed</p>
                  <p className="text-2xl font-bold">
                    {progress.completedLessons.length}
                  </p>
                </div>
                <div>
                  <p className="font-medium">XP Earned</p>
                  <p className="text-2xl font-bold">{progress.xp}</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm">
                  💡 Tip: Complete all lessons in a module to unlock special
                  achievements and earn bonus XP!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 