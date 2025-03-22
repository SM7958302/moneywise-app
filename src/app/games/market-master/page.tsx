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
    title: "Stock Market Basics",
    description: "You're new to investing and want to start with stocks. What's your first move?",
    options: [
      {
        text: "Research index funds",
        impact: { savings: 1000, risk: 20, xp: 50 },
        feedback: "Great choice! Index funds are a low-risk way to start investing in the stock market.",
      },
      {
        text: "Buy individual stocks",
        impact: { savings: 2000, risk: 60, xp: 30 },
        feedback: "Individual stocks can be risky for beginners. Consider starting with index funds first.",
      },
      {
        text: "Consult a financial advisor",
        impact: { savings: -500, xp: 40 },
        feedback: "Professional advice is valuable, but make sure to understand the basics yourself too.",
      },
    ],
  },
  {
    id: 2,
    title: "Market Volatility",
    description: "The market is experiencing high volatility. How do you react?",
    options: [
      {
        text: "Stay invested",
        impact: { savings: 1500, risk: 30, xp: 80 },
        feedback: "Smart move! Staying invested during volatility often leads to better long-term returns.",
      },
      {
        text: "Sell everything",
        impact: { savings: -1000, risk: 0, xp: 20 },
        feedback: "Selling during market dips can lock in losses. Consider your long-term goals.",
      },
      {
        text: "Buy more",
        impact: { savings: 2000, risk: 50, xp: 60 },
        feedback: "Buying during dips can be good, but make sure you have a diversified portfolio.",
      },
    ],
  },
  {
    id: 3,
    title: "Dividend Investing",
    description: "You're considering dividend stocks for passive income. What's your approach?",
    options: [
      {
        text: "Research dividend aristocrats",
        impact: { income: 500, risk: 30, xp: 70 },
        feedback: "Dividend aristocrats are reliable companies with a history of increasing dividends.",
      },
      {
        text: "Focus on high yield",
        impact: { income: 1000, risk: 60, xp: 40 },
        feedback: "High yield can be tempting, but watch out for unsustainable dividend rates.",
      },
      {
        text: "Diversify across sectors",
        impact: { income: 800, risk: 40, xp: 60 },
        feedback: "Diversification helps reduce risk while maintaining good income potential.",
      },
    ],
  },
  {
    id: 4,
    title: "Market Research",
    description: "You're analyzing a company's financial statements. What do you focus on?",
    options: [
      {
        text: "Revenue growth",
        impact: { savings: 1000, xp: 60 },
        feedback: "Revenue growth is important, but also consider profit margins and cash flow.",
      },
      {
        text: "Debt levels",
        impact: { savings: 800, xp: 50 },
        feedback: "Debt analysis is crucial for understanding a company's financial health.",
      },
      {
        text: "Market share",
        impact: { savings: 600, xp: 40 },
        feedback: "Market share is important, but don't overlook other key financial metrics.",
      },
    ],
  },
  {
    id: 5,
    title: "Portfolio Rebalancing",
    description: "Your portfolio has grown significantly. What's your next step?",
    options: [
      {
        text: "Rebalance to target allocation",
        impact: { savings: 1500, risk: 20, xp: 80 },
        feedback: "Regular rebalancing helps maintain your desired risk level and investment strategy.",
      },
      {
        text: "Let it ride",
        impact: { savings: 2000, risk: 40, xp: 40 },
        feedback: "While letting winners run can be profitable, it may increase your risk exposure.",
      },
      {
        text: "Take profits",
        impact: { savings: 1000, risk: 0, xp: 30 },
        feedback: "Taking profits can be good, but consider your long-term investment goals.",
      },
    ],
  },
  {
    id: 6,
    title: "Market Timing",
    description: "You're trying to decide when to enter the market. What's your strategy?",
    options: [
      {
        text: "Dollar-cost averaging",
        impact: { savings: 1200, risk: 30, xp: 70 },
        feedback: "Dollar-cost averaging helps reduce the impact of market timing on your investments.",
      },
      {
        text: "Wait for market bottom",
        impact: { savings: 0, risk: 0, xp: 20 },
        feedback: "Trying to time the market bottom is extremely difficult and often counterproductive.",
      },
      {
        text: "Invest lump sum",
        impact: { savings: 2000, risk: 50, xp: 40 },
        feedback: "Lump sum investing can work, but consider your risk tolerance and time horizon.",
      },
    ],
  },
]

export default function MarketMasterGame() {
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
        <h1 className="text-3xl font-bold">Market Master</h1>
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
              <p>Congratulations on completing Market Master!</p>
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
                  title="I completed Market Master!"
                  text={`I reached level ${level} and learned about investing! Can you beat my score?`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 