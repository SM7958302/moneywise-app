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
    title: "Emergency Fund",
    description: "You've just started working and want to build an emergency fund. What's your first step?",
    options: [
      {
        text: "Set up automatic transfers",
        impact: { savings: 1000, happiness: 10, xp: 60 },
        feedback: "Great choice! Automatic transfers make saving consistent and effortless.",
      },
      {
        text: "Cut all expenses",
        impact: { savings: 800, happiness: -10, xp: 40 },
        feedback: "While cutting expenses helps, balance is important for long-term success.",
      },
      {
        text: "Save what's left",
        impact: { savings: 400, xp: 20 },
        feedback: "Saving what's left often means saving nothing. Make saving a priority.",
      },
    ],
  },
  {
    id: 2,
    title: "Savings Goal",
    description: "You want to save for a vacation. How do you approach this goal?",
    options: [
      {
        text: "Create a dedicated account",
        impact: { savings: 1200, happiness: 10, xp: 70 },
        feedback: "Separate accounts help track progress and prevent spending from other goals.",
      },
      {
        text: "Save in main account",
        impact: { savings: 800, xp: 40 },
        feedback: "While this works, separate accounts can help prevent accidental spending.",
      },
      {
        text: "Use credit card",
        impact: { debt: 2000, happiness: -10, xp: 20 },
        feedback: "Using credit for vacations can lead to high interest charges and debt.",
      },
    ],
  },
  {
    id: 3,
    title: "Windfall Money",
    description: "You received a $5000 bonus at work. How do you use it?",
    options: [
      {
        text: "Split between savings and fun",
        impact: { savings: 3000, happiness: 20, xp: 80 },
        feedback: "Balancing saving and enjoyment is key to maintaining good financial habits.",
      },
      {
        text: "Save it all",
        impact: { savings: 5000, happiness: 5, xp: 60 },
        feedback: "While saving is important, treating yourself occasionally can help maintain motivation.",
      },
      {
        text: "Spend it all",
        impact: { savings: 0, happiness: 30, xp: 20 },
        feedback: "While fun, spending windfalls without saving can lead to missed opportunities.",
      },
    ],
  },
  {
    id: 4,
    title: "Savings Challenge",
    description: "Your friend suggests a \"no-spend\" month challenge. How do you participate?",
    options: [
      {
        text: "Set specific rules",
        impact: { savings: 1500, happiness: 10, xp: 70 },
        feedback: "Clear rules help maintain discipline while being realistic about needs.",
      },
      {
        text: "Go all in",
        impact: { savings: 2000, happiness: -20, xp: 50 },
        feedback: "While effective, extreme challenges can be hard to maintain long-term.",
      },
      {
        text: "Track expenses first",
        impact: { savings: 800, xp: 40 },
        feedback: "Understanding spending patterns is crucial before making changes.",
      },
    ],
  },
  {
    id: 5,
    title: "Savings vs. Debt",
    description: "You have both savings and credit card debt. What's your priority?",
    options: [
      {
        text: "Build emergency fund first",
        impact: { savings: 1000, debt: 200, xp: 60 },
        feedback: "Having an emergency fund prevents new debt when unexpected expenses arise.",
      },
      {
        text: "Pay off debt first",
        impact: { savings: 500, debt: -1000, xp: 70 },
        feedback: "Paying high-interest debt first can save money in the long run.",
      },
      {
        text: "Split between both",
        impact: { savings: 800, debt: -500, xp: 80 },
        feedback: "Balancing both goals helps build savings while reducing debt.",
      },
    ],
  },
  {
    id: 6,
    title: "Long-term Savings",
    description: "You're planning for retirement. What's your savings strategy?",
    options: [
      {
        text: "Start with 401(k)",
        impact: { savings: 2000, happiness: 10, xp: 90 },
        feedback: "Employer-sponsored plans often include matching contributions - don't miss out!",
      },
      {
        text: "Save in regular account",
        impact: { savings: 1500, xp: 50 },
        feedback: "While saving is good, tax-advantaged accounts can grow your money faster.",
      },
      {
        text: "Wait until later",
        impact: { savings: 0, xp: 20 },
        feedback: "Starting early takes advantage of compound interest - don't delay!",
      },
    ],
  },
]

export default function SavingsQuestGame() {
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
        <h1 className="text-3xl font-bold">Savings Quest</h1>
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
              <p>Congratulations on completing Savings Quest!</p>
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
                  title="I completed Savings Quest!"
                  text={`I reached level ${level} and learned about saving money! Can you beat my score?`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 