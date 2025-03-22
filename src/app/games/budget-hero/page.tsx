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
    description:
      "Your car broke down and needs urgent repairs. The mechanic quoted $800 for the fix. What do you do?",
    options: [
      {
        text: "Use emergency fund",
        impact: { savings: -800, xp: 50 },
        feedback: "Good choice! Using your emergency fund is the right approach for unexpected expenses.",
      },
      {
        text: "Put it on credit card",
        impact: { debt: 800, xp: 20 },
        feedback: "This could lead to high interest charges. Consider building an emergency fund for future situations.",
      },
      {
        text: "Delay repairs",
        impact: { health: -20, xp: 10 },
        feedback: "Delaying repairs could lead to more expensive problems later. It's better to address issues promptly.",
      },
    ],
  },
  {
    id: 2,
    title: "Job Opportunity",
    description:
      "You've been offered a new job with a 20% higher salary but requires moving to a new city. What's your decision?",
    options: [
      {
        text: "Accept and move",
        impact: { income: 2000, savings: -5000, xp: 100 },
        feedback: "Taking calculated risks can lead to better opportunities. Just make sure to plan the move carefully.",
      },
      {
        text: "Stay at current job",
        impact: { happiness: 10, xp: 30 },
        feedback: "Stability is important too. Sometimes the best decision is to stay where you're comfortable.",
      },
      {
        text: "Negotiate remote work",
        impact: { income: 1000, happiness: 5, xp: 80 },
        feedback: "Great negotiation! You found a balanced solution that works for everyone.",
      },
    ],
  },
  {
    id: 3,
    title: "Investment Opportunity",
    description:
      "A friend suggests investing in a new cryptocurrency that promises high returns. What's your response?",
    options: [
      {
        text: "Research thoroughly",
        impact: { savings: -1000, xp: 70 },
        feedback: "Smart approach! Always do your research before investing in any opportunity.",
      },
      {
        text: "Invest large amount",
        impact: { savings: -5000, risk: 50, xp: 20 },
        feedback: "Be cautious with high-risk investments. Never invest more than you can afford to lose.",
      },
      {
        text: "Decline politely",
        impact: { savings: 0, xp: 40 },
        feedback: "Sometimes the best investment is saying no to risky opportunities.",
      },
    ],
  },
  {
    id: 4,
    title: "Medical Emergency",
    description:
      "You need urgent dental work that costs $1200. Your insurance covers 50%. How do you handle this?",
    options: [
      {
        text: "Use HSA/FSA funds",
        impact: { savings: -600, xp: 60 },
        feedback: "Using tax-advantaged accounts for medical expenses is a smart financial move.",
      },
      {
        text: "Set up payment plan",
        impact: { debt: 600, xp: 40 },
        feedback: "Payment plans can help manage large expenses, but watch out for interest charges.",
      },
      {
        text: "Delay treatment",
        impact: { health: -30, xp: 10 },
        feedback: "Medical issues should be addressed promptly to prevent more serious problems.",
      },
    ],
  },
  {
    id: 5,
    title: "Housing Decision",
    description:
      "Your lease is ending, and you're deciding between renewing or buying a home. What's your choice?",
    options: [
      {
        text: "Buy a home",
        impact: { savings: -20000, debt: 200000, xp: 150 },
        feedback: "Homeownership can be a good long-term investment, but make sure you're ready for the commitment.",
      },
      {
        text: "Renew lease",
        impact: { savings: -2000, xp: 40 },
        feedback: "Sometimes renting is the better choice, especially if you're not ready for homeownership.",
      },
      {
        text: "Find cheaper rental",
        impact: { savings: 1000, xp: 60 },
        feedback: "Reducing housing costs can free up money for other financial goals.",
      },
    ],
  },
  {
    id: 6,
    title: "Education Investment",
    description:
      "You have an opportunity to take a professional certification course that costs $2000. What do you do?",
    options: [
      {
        text: "Use education fund",
        impact: { savings: -2000, income: 500, xp: 100 },
        feedback: "Investing in education often leads to better career opportunities and higher income.",
      },
      {
        text: "Take out loan",
        impact: { debt: 2000, income: 500, xp: 60 },
        feedback: "Education loans can be worth it if they lead to better career prospects.",
      },
      {
        text: "Find free alternatives",
        impact: { savings: 0, income: 200, xp: 80 },
        feedback: "There are many free or low-cost learning opportunities available online.",
      },
    ],
  },
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