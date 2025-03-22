"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { scenarios, type Scenario, type Difficulty } from "@/lib/game-data"
import { useToast, Toast } from "@/components/ui/use-toast"

export default function BudgetHero() {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [stats, setStats] = useState({
    savings: 0,
    debt: 0,
    income: 0,
    health: 100,
    happiness: 100,
    discipline: 100,
    risk: 0,
    xp: 0
  })
  const [level, setLevel] = useState(1)
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const { toast, toasts } = useToast()

  useEffect(() => {
    loadNextScenario()
  }, [difficulty])

  const loadNextScenario = () => {
    const availableScenarios = scenarios.filter(s => s.difficulty === difficulty)
    if (availableScenarios.length === 0) {
      if (difficulty === "easy") {
        setDifficulty("medium")
      } else if (difficulty === "medium") {
        setDifficulty("hard")
      } else {
        toast({
          title: "Congratulations!",
          description: "You've completed all scenarios!",
          variant: "default"
        })
        return
      }
      return
    }

    const randomIndex = Math.floor(Math.random() * availableScenarios.length)
    setCurrentScenario(availableScenarios[randomIndex])
    setSelectedOption(null)
  }

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return // Prevent multiple selections

    setSelectedOption(optionIndex)
    const option = currentScenario?.options[optionIndex]
    if (!option) return

    // Update stats based on the selected option
    setStats(prev => ({
      savings: prev.savings + option.impact.savings,
      debt: prev.debt + option.impact.debt,
      income: prev.income + option.impact.income,
      health: Math.max(0, Math.min(100, prev.health + (option.impact.health || 0))),
      happiness: Math.max(0, Math.min(100, prev.happiness + (option.impact.happiness || 0))),
      discipline: Math.max(0, Math.min(100, prev.discipline + (option.impact.discipline || 0))),
      risk: Math.max(0, Math.min(100, prev.risk + option.impact.risk)),
      xp: prev.xp + (option.isCorrect ? option.impact.xp * 2 : option.impact.xp)
    }))

    // Show feedback
    toast({
      title: option.isCorrect ? "Correct!" : "Not quite right",
      description: option.feedback,
      variant: option.isCorrect ? "default" : "destructive"
    })

    // Load next scenario after a delay
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
          <h1 className="text-2xl font-bold">Budget Hero</h1>
          <span className={`font-semibold ${getDifficultyColor(difficulty)}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{currentScenario.title}</h2>
          <p className="text-gray-600">{currentScenario.description}</p>
        </div>

        <div className="grid gap-4 mb-6">
          {currentScenario.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedOption === index ? "default" : "outline"}
              className="w-full text-left justify-start"
              onClick={() => handleOptionSelect(index)}
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
                <Progress value={(stats.savings / 5000) * 100} className="h-2" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Debt</p>
                <Progress value={(stats.debt / 5000) * 100} className="h-2" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Health</p>
                <Progress value={stats.health} className="h-2" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Happiness</p>
                <Progress value={stats.happiness} className="h-2" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Discipline</p>
                <Progress value={stats.discipline} className="h-2" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Risk</p>
                <Progress value={stats.risk} className="h-2" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Progress</h3>
            <div className="flex items-center gap-4">
              <Progress value={(stats.xp / (level * 100)) * 100} className="h-2 flex-1" />
              <span className="text-sm font-medium">Level {level}</span>
            </div>
          </div>
        </div>
      </Card>
      <Toast toasts={toasts} />
    </div>
  )
} 