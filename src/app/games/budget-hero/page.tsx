"use client"

import { useState } from "react"
import { useGame } from "@/context/GameContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { ShareButton } from "@/components/ui/share-button"
import { scenarios } from "@/lib/game-data"
import { FinancialCharts } from "@/components/ui/financial-charts"

interface ScenarioOption {
  text: string
  impact: {
    savings: number
    debt: number
    income: number
    health: number
    happiness: number
    risk: number
    xp: number
  }
  feedback: string
}

export default function BudgetHeroGame() {
  const { addXP, level, xp, xpToNextLevel, completeScenario } = useGame()
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [gameState, setGameState] = useState({
    savings: 1000,
    debt: 0,
    income: 3000,
    expenses: 2000,
    health: 100,
    happiness: 100,
    risk: 0
  })
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [gameComplete, setGameComplete] = useState(false)

  const currentScenario = scenarios[currentScenarioIndex]
  if (!currentScenario || !currentScenario.options) return null

  const handleChoice = (option: ScenarioOption) => {
    // Update game state based on choice impact
    setGameState(prev => ({
      savings: Math.max(0, prev.savings + option.impact.savings),
      debt: Math.max(0, prev.debt + option.impact.debt),
      income: Math.max(0, prev.income + option.impact.income),
      expenses: Math.max(0, prev.expenses),
      health: Math.max(0, Math.min(100, prev.health + option.impact.health)),
      happiness: Math.max(0, Math.min(100, prev.happiness + option.impact.happiness)),
      risk: Math.max(0, Math.min(100, prev.risk + option.impact.risk))
    }))

    // Add XP and complete scenario
    addXP(option.impact.xp)
    completeScenario(currentScenario.id)

    // Show feedback
    setFeedback(option.feedback)
    setShowFeedback(true)

    // Move to next scenario after delay
    setTimeout(() => {
      if (currentScenarioIndex < scenarios.length - 1) {
        setCurrentScenarioIndex(prev => prev + 1)
        setShowFeedback(false)
      } else {
        setGameComplete(true)
      }
    }, 3000)
  }

  const resetGame = () => {
    setCurrentScenarioIndex(0)
    setGameState({
      savings: 1000,
      debt: 0,
      income: 3000,
      expenses: 2000,
      health: 100,
      happiness: 100,
      risk: 0
    })
    setShowFeedback(false)
    setGameComplete(false)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Budget Hero</h1>
          <p className="text-muted-foreground">
            Make smart financial decisions and learn about money management
          </p>
        </div>

        <FinancialCharts {...gameState} />

        <Card>
          <CardHeader>
            <CardTitle>{currentScenario.title}</CardTitle>
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
      </motion.div>

      {gameComplete && (
        <Card>
          <CardHeader>
            <CardTitle>Game Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Congratulations on completing Budget Hero!</p>
              <p>Final Stats:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Savings: ${gameState.savings}</li>
                <li>Debt: ${gameState.debt}</li>
                <li>Income: ${gameState.income}</li>
                <li>Health: {gameState.health}%</li>
                <li>Happiness: {gameState.happiness}%</li>
                <li>Risk Level: {gameState.risk}%</li>
              </ul>
              <div className="flex gap-4">
                <Button onClick={resetGame}>Play Again</Button>
                <ShareButton
                  title="I completed Budget Hero!"
                  text={`I reached level ${level} and managed my finances well! Can you beat my score?`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 