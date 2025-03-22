"use client"

import { useState, useEffect } from "react"
import { useGame } from "@/context/GameContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { ShareButton } from "@/components/ui/share-button"
import { savingScenarios } from "@/lib/game-data"
import { MiniGame } from "@/components/ui/mini-games"

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
  miniGame?: {
    type: "budget_planner" | "stock_picker" | "savings_challenge"
    bonus: number
  }
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
  const [showMiniGame, setShowMiniGame] = useState(false)
  const [currentOption, setCurrentOption] = useState<ScenarioOption | null>(null)

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
      if (option.miniGame) {
        setCurrentOption(option)
        setShowMiniGame(true)
        return
      }

      applyChoice(option)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const applyChoice = (option: ScenarioOption, miniGameScore: number = 0) => {
    setGameState(prev => ({
      savings: Math.max(0, prev.savings + option.impact.savings),
      debt: Math.max(0, prev.debt + option.impact.debt),
      income: Math.max(0, prev.income + option.impact.income),
      discipline: Math.max(0, Math.min(100, prev.discipline + option.impact.discipline)),
      risk: Math.max(0, Math.min(100, prev.risk + option.impact.risk))
    }))

    const bonusXP = option.miniGame ? Math.floor(miniGameScore * (option.miniGame.bonus / 100)) : 0
    addXP(option.impact.xp + bonusXP)
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
  }

  const handleMiniGameComplete = (score: number) => {
    if (currentOption) {
      applyChoice(currentOption, score)
      setShowMiniGame(false)
      setCurrentOption(null)
    }
  }

  const handleMiniGameSkip = () => {
    if (currentOption) {
      applyChoice(currentOption)
      setShowMiniGame(false)
      setCurrentOption(null)
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
      setShowMiniGame(false)
      setCurrentOption(null)
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

  if (showMiniGame && currentOption?.miniGame) {
    return (
      <div className="container mx-auto p-4">
        <MiniGame
          type={currentOption.miniGame.type}
          onComplete={handleMiniGameComplete}
          onSkip={handleMiniGameSkip}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Saving Quest</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            Level {level} • {xp}/{xpToNextLevel} XP
          </div>
          <Progress value={(xp / xpToNextLevel) * 100} className="w-32" />
        </div>
      </div>

      {!gameComplete ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenarioIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Scenario {currentScenarioIndex + 1} of {savingScenarios.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      {currentScenario.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {currentScenario.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentScenario.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto py-4"
                        onClick={() => handleChoice(option)}
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>

                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-primary/10 rounded-lg"
                    >
                      {feedback}
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
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
        </AnimatePresence>
      ) : (
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