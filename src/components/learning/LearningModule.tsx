"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGame } from "@/context/GameContext"
import { learningModules } from "@/lib/game-data"

export function LearningModule({ moduleId }: { moduleId: string }) {
  const { addXP, completeLesson } = useGame()
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)

  const module = learningModules.find(m => m.id === moduleId)
  if (!module) return null

  const currentLesson = module.lessons[currentLessonIndex]

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return

    const correct = selectedAnswer === currentLesson.quiz[0].correct
    setIsAnswerCorrect(correct)

    if (correct) {
      addXP(50)
      completeLesson(currentLesson.id)
    }
  }

  const nextLesson = () => {
    if (currentLessonIndex < module.lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1)
      setShowQuiz(false)
      setSelectedAnswer(null)
      setIsAnswerCorrect(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">{module.title}</h2>
        <p className="text-muted-foreground">
          Lesson {currentLessonIndex + 1} of {module.lessons.length}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentLesson.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showQuiz ? (
            <>
              <p className="text-lg">{currentLesson.content}</p>
              <Button onClick={() => setShowQuiz(true)}>Take Quiz</Button>
            </>
          ) : (
            <div className="space-y-4">
              <p className="font-medium">{currentLesson.quiz[0].question}</p>
              <div className="space-y-2">
                {currentLesson.quiz[0].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedAnswer(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {selectedAnswer !== null && !isAnswerCorrect && (
                <Button onClick={handleAnswerSubmit}>Submit Answer</Button>
              )}
              {isAnswerCorrect && (
                <div className="space-y-4">
                  <p className="text-green-600 font-medium">
                    Correct! You earned 50 XP!
                  </p>
                  {currentLessonIndex < module.lessons.length - 1 && (
                    <Button onClick={nextLesson}>Next Lesson</Button>
                  )}
                </div>
              )}
              {isAnswerCorrect === false && (
                <p className="text-red-600 font-medium">
                  Try again! Review the lesson and try the quiz again.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
} 