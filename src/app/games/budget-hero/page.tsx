"use client"

import { useState } from "react"
import { useGame } from "@/context/GameContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { ShareButton } from "@/components/ui/share-button"

interface Scenario {
  id: number
  title: string
  description: string
  options: {
    text: string
    impact: {
      savings?: number
      debt?: number
      income?: number
      health?: number
      happiness?: number
      risk?: number
      xp: number
    }
    feedback: string
  }[]
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Emergency Car Repair",
    description: "Your car breaks down and needs a $2000 repair. What do you do?",
    options: [
      {
        text: "Use emergency fund",
        impact: { savings: -2000, health: 10, xp: 80 },
        feedback: "Smart choice! Using your emergency fund is exactly what it's for.",
      },
      {
        text: "Take out a loan",
        impact: { debt: 2000, health: -10, xp: 40 },
        feedback: "While this works, it adds interest costs. Consider building an emergency fund for next time.",
      },
      {
        text: "Delay repair",
        impact: { health: -20, happiness: -10, xp: 20 },
        feedback: "Delaying repairs can lead to bigger problems and higher costs later.",
      },
    ],
  },
  {
    id: 2,
    title: "Job Opportunity",
    description: "You're offered a new job with higher pay but requires moving. What's your decision?",
    options: [
      {
        text: "Negotiate relocation package",
        impact: { income: 1000, savings: 5000, happiness: 10, xp: 90 },
        feedback: "Great negotiation! A relocation package helps offset moving costs.",
      },
      {
        text: "Accept without package",
        impact: { income: 1000, savings: -2000, happiness: 5, xp: 60 },
        feedback: "While the pay increase is good, moving costs can be significant.",
      },
      {
        text: "Stay at current job",
        impact: { happiness: -10, xp: 30 },
        feedback: "Staying comfortable can mean missing growth opportunities.",
      },
    ],
  }
]

export default function BudgetHeroGame() {
  const { addXP, level, xp, xpToNextLevel } = useGame()
  const [currentScenario, setCurrentScenario] = useState(0)
  const [gameState, setGameState] = useState({
    savings: 5000,
    debt: 0,
    income: 3000,
    health: 100,
    happiness: 50,
    risk: 0,
  })
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [gameComplete, setGameComplete] = useState(false)

  const handleChoice = (option: Scenario["options"][0]) => {
    const newState = { ...gameState }
    Object.entries(option.impact).forEach(([key, value]) => {
      if (key === "xp") {
        addXP(value)
      } else {
        newState[key as keyof typeof newState] += value
      }
    })
    setGameState(newState)
    setFeedback(option.feedback)
    setShowFeedback(true)

    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1)
        setShowFeedback(false)
      } else {
        setGameComplete(true)
      }
    }, 2000)
  }

  const resetGame = () => {
    setCurrentScenario(0)
    setGameState({
      savings: 5000,
      debt: 0,
      income: 3000,
      health: 100,
      happiness: 50,
      risk: 0,
    })
    setShowFeedback(false)
    setGameComplete(false)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Budget Hero</h1>
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
            key={currentScenario}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Scenario {currentScenario + 1} of {scenarios.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">
                      {scenarios[currentScenario].title}
                    </h2>
                    <p className="text-muted-foreground">
                      {scenarios[currentScenario].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {scenarios[currentScenario].options.map((option, index) => (
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
          </motion.div>
        </AnimatePresence>
      ) : (
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