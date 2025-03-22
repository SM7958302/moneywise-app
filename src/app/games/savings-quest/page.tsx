"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { savingScenarios, type Scenario, type Difficulty, type ScenarioOption } from "@/lib/game-data"
import { useToast, Toast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { ShareButton } from "@/components/ui/share-button"

export default function SavingsQuestGame() {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [selectedOption, setSelectedOption] = useState<ScenarioOption | null>(null)
  const [timeLeft, setTimeLeft] = useState(30)
  const [playerStats, setPlayerStats] = useState({
    savings: 1000,
    debt: 0,
    income: 2000,
    health: 100,
    happiness: 100,
    discipline: 100,
    risk: 0,
    xp: 0,
    level: 1
  })
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [showDifficultySelector, setShowDifficultySelector] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const { toast, toasts } = useToast()

  useEffect(() => {
    if (!showDifficultySelector && !gameOver) {
      loadNextScenario()
    }
  }, [showDifficultySelector, gameOver])

  useEffect(() => {
    if (!showDifficultySelector && !gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [showDifficultySelector, gameOver, timeLeft])

  const handleTimeUp = () => {
    if (currentScenario) {
      const randomOption = currentScenario.options[Math.floor(Math.random() * currentScenario.options.length)]
      handleOptionSelect(randomOption)
    }
  }

  const loadNextScenario = () => {
    const difficultyScenarios = savingScenarios.filter(s => s.difficulty === difficulty)
    if (difficultyScenarios.length === 0) {
      setGameOver(true)
      return
    }

    const randomIndex = Math.floor(Math.random() * difficultyScenarios.length)
    const nextScenario = difficultyScenarios[randomIndex]
    setCurrentScenario(nextScenario)
    setSelectedOption(null)
    setTimeLeft(30)
  }

  const handleOptionSelect = (option: ScenarioOption) => {
    if (selectedOption) return // Prevent multiple selections

    setSelectedOption(option)
    setTimeLeft(0) // Stop the timer

    // Update player stats
    setPlayerStats(prev => {
      const newStats = {
        ...prev,
        savings: Math.max(0, prev.savings + (option.impact.savings ?? 0)),
        debt: Math.max(0, prev.debt + (option.impact.debt ?? 0)),
        income: Math.max(0, prev.income + (option.impact.income ?? 0)),
        health: Math.min(100, Math.max(0, prev.health + (option.impact.health ?? 0))),
        happiness: Math.min(100, Math.max(0, prev.happiness + (option.impact.happiness ?? 0))),
        discipline: Math.min(100, Math.max(0, prev.discipline + (option.impact.discipline ?? 0))),
        risk: Math.min(100, Math.max(0, prev.risk + option.impact.risk)),
        xp: prev.xp + option.impact.xp,
        level: Math.floor(prev.xp / 1000) + 1
      }
      return newStats
    })

    // Show feedback and move to next scenario after a delay
    setTimeout(() => {
      loadNextScenario()
    }, 2000)
  }

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case "easy": return "text-green-500"
      case "medium": return "text-yellow-500"
      case "hard": return "text-red-500"
    }
  }

  const handleDifficultySelect = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty)
    setShowDifficultySelector(false)
    setPlayerStats({
      savings: 1000,
      debt: 0,
      income: 2000,
      health: 100,
      happiness: 100,
      discipline: 100,
      risk: 0,
      xp: 0,
      level: 1
    })
  }

  if (showDifficultySelector) {
    return (
      <div className="container mx-auto p-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Select Difficulty</h1>
          <p className="text-gray-600 mb-6">Choose your difficulty level to start the game:</p>
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="w-full text-left justify-start"
              onClick={() => handleDifficultySelect("easy")}
            >
              <div className="flex items-center gap-2">
                <span className="text-green-500">Easy</span>
                <span className="text-sm text-gray-500">Basic savings concepts</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full text-left justify-start"
              onClick={() => handleDifficultySelect("medium")}
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">Medium</span>
                <span className="text-sm text-gray-500">Intermediate savings concepts</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full text-left justify-start"
              onClick={() => handleDifficultySelect("hard")}
            >
              <div className="flex items-center gap-2">
                <span className="text-red-500">Hard</span>
                <span className="text-sm text-gray-500">Advanced savings concepts</span>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  if (!currentScenario) {
    return (
      <div className="container mx-auto p-4">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Savings Quest</h1>
          <div className="flex items-center gap-4">
            <span className={`font-semibold ${getDifficultyColor(difficulty)}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDifficultySelector(true)}
            >
              Change Difficulty
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{currentScenario.title}</h2>
          <p className="text-gray-600">{currentScenario.description}</p>
        </div>

        <div className="grid gap-4 mb-6">
          {currentScenario.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === option ? "default" : "outline"}
              className="w-full text-left justify-start"
              onClick={() => handleOptionSelect(option)}
              disabled={selectedOption !== null}
            >
              {option.text}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Your Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Savings</p>
                <Progress value={(playerStats.savings / 5000) * 100} className="h-2" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Debt</p>
                <Progress value={(playerStats.debt / 5000) * 100} className="h-2" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Health</p>
                <Progress value={playerStats.health} className="h-2" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Happiness</p>
                <Progress value={playerStats.happiness} className="h-2" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Discipline</p>
                <Progress value={playerStats.discipline} className="h-2" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Risk</p>
                <Progress value={playerStats.risk} className="h-2" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Progress</h3>
            <div className="flex items-center gap-4">
              <Progress value={(playerStats.xp / (playerStats.level * 100)) * 100} className="h-2 flex-1" />
              <span className="text-sm font-medium">Level {playerStats.level}</span>
            </div>
          </div>
        </div>
      </Card>
      <Toast toasts={toasts} />
    </div>
  )
} 