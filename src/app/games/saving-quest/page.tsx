"use client"

import { useState, useEffect } from "react"
import { useGame } from "@/context/GameContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { ShareButton } from "@/components/ui/share-button"
import { savingScenarios } from "@/lib/game-data"

interface ScenarioOption {
  text: string
  impact: {
    savings: number
    debt: number
    income: number
    discipline: number
    risk: number
    xp: number
  }
  feedback: string
}

export default function SavingQuestGame() {
  const { addXP, level, xp, xpToNextLevel, completeScenario } = useGame()
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [gameState, setGameState] = useState({
    savings: 5000,
    debt: 2000,
    income: 3000,
    discipline: 50,
    risk: 0
  })
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [gameComplete, setGameComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (!savingScenarios || savingScenarios.length === 0) {
        throw new Error("No scenarios available")
      }
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load game")
      setIsLoading(false)
    }
  }, [])

  const currentScenario = savingScenarios[currentScenarioIndex]
  if (!currentScenario || !currentScenario.options) return null

  const handleChoice = (option: ScenarioOption) => {
    try {
      setGameState(prev => ({
        savings: Math.max(0, prev.savings + option.impact.savings),
        debt: Math.max(0, prev.debt + option.impact.debt),
        income: Math.max(0, prev.income + option.impact.income),
        discipline: Math.max(0, Math.min(100, prev.discipline + option.impact.discipline)),
        risk: Math.max(0, Math.min(100, prev.risk + option.impact.risk))
      }))

      addXP(option.impact.xp)
      completeScenario(currentScenario.id)

      setFeedback(option.feedback)
      setShowFeedback(true)

      setTimeout(() => {
        if (currentScenarioIndex < savingScenarios.length - 1) {
          setCurrentScenarioIndex(prev => prev + 1)
          setShowFeedback(false)
        } else {
          setGameComplete(true)
        }
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const resetGame = () => {
    try {
      setCurrentScenarioIndex(0)
      setGameState({
        savings: 5000,
        debt: 2000,
        income: 3000,
        discipline: 50,
        risk: 0
      })
      setShowFeedback(false)
      setGameComplete(false)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset game")
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-8 text-center">
            <p>Loading game...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={resetGame}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Saving Quest</h1>
          <p className="text-muted-foreground">
            Master the art of saving and financial discipline
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="text-sm">
              Level {level} • {xp}/{xpToNextLevel} XP
            </div>
            <Progress value={(xp / xpToNextLevel) * 100} className="w-32" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{currentScenario.title}</CardTitle>
            <div className="text-sm text-muted-foreground">
              Scenario {currentScenarioIndex + 1} of {savingScenarios.length}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">{currentScenario.description}</p>
            <div className="grid gap-4">
              {currentScenario.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left h-auto py-4"
                  onClick={() => handleChoice(option)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-muted rounded-lg"
              >
                <p className="text-sm">{feedback}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Savings</p>
                <p className="text-2xl font-bold">${gameState.savings}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Debt</p>
                <p className="text-2xl font-bold">${gameState.debt}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Income</p>
                <p className="text-2xl font-bold">${gameState.income}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Discipline</p>
                <p className="text-2xl font-bold">{gameState.discipline}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {gameComplete && (
        <Card>
          <CardHeader>
            <CardTitle>Game Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Congratulations on completing Saving Quest!</p>
              <p>Final Stats:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Savings: ${gameState.savings}</li>
                <li>Debt: ${gameState.debt}</li>
                <li>Income: ${gameState.income}</li>
                <li>Discipline: {gameState.discipline}%</li>
                <li>Risk Level: {gameState.risk}%</li>
              </ul>
              <div className="flex gap-4">
                <Button onClick={resetGame}>Play Again</Button>
                <ShareButton
                  title="I completed Saving Quest!"
                  text={`I reached level ${level} and saved $${gameState.savings}! Can you beat my score?`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 