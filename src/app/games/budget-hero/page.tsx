"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGame } from "@/context/GameContext"
import { scenarios } from "@/lib/game-data"
import { AchievementsPanel } from "@/components/game/AchievementsPanel"

export default function BudgetHeroGame() {
  const { addXP, unlockAchievement, completeScenario, progress } = useGame()
  const [currentScenario, setCurrentScenario] = useState(scenarios[0])
  const [income, setIncome] = useState(currentScenario.monthlyIncome)
  const [expenses, setExpenses] = useState<Record<string, number>>(
    Object.fromEntries(
      currentScenario.expenses.map(exp => [exp.id, exp.recommended])
    )
  )
  const [showTip, setShowTip] = useState(true)
  const [monthsCompleted, setMonthsCompleted] = useState(0)
  const [isGameComplete, setIsGameComplete] = useState(false)

  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0)
  const remaining = income - totalExpenses

  const handleExpenseChange = (category: string, value: string) => {
    const numValue = parseInt(value) || 0
    setExpenses(prev => ({
      ...prev,
      [category]: numValue
    }))
  }

  const handleNextMonth = () => {
    if (isGameComplete) return;

    const newMonthsCompleted = monthsCompleted + 1
    setMonthsCompleted(newMonthsCompleted)
    
    // Check if goals are met
    const goalsMet = currentScenario.goals.every(goal => {
      if (goal.id === "emergency" || goal.id === "savings") {
        return remaining >= goal.amount
      }
      return expenses[goal.id] >= goal.amount
    })

    if (goalsMet && !progress.completedScenarios.includes(currentScenario.id)) {
      // Award achievements based on performance
      if (remaining >= income * 0.2) {
        unlockAchievement("saving_star")
      }
      
      if (newMonthsCompleted >= 3) {
        unlockAchievement("expense_master")
      }

      // Award XP for completing the scenario
      addXP(200)
      completeScenario(currentScenario.id)
      
      // Move to next scenario if available
      const nextScenarioIndex = scenarios.findIndex(s => s.id === currentScenario.id) + 1
      if (scenarios[nextScenarioIndex]) {
        setCurrentScenario(scenarios[nextScenarioIndex])
        setIncome(scenarios[nextScenarioIndex].monthlyIncome)
        setExpenses(
          Object.fromEntries(
            scenarios[nextScenarioIndex].expenses.map(exp => [exp.id, exp.recommended])
          )
        )
        setMonthsCompleted(0)
      } else {
        setIsGameComplete(true)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Budget Hero</h1>
            <p className="text-muted-foreground">Master your budgeting skills!</p>
          </div>

          {showTip && (
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium mb-2">Quick Tip!</h3>
                    <p className="text-sm">
                      Try to save at least 20% of your income. This helps build an
                      emergency fund and secure your financial future.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTip(false)}
                  >
                    ✕
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Scenario: {currentScenario.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{currentScenario.description}</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Monthly Income
                  </label>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(parseInt(e.target.value) || 0)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentScenario.expenses.map(expense => (
              <Card key={expense.id}>
                <CardHeader>
                  <CardTitle className="capitalize">{expense.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <input
                    type="number"
                    value={expenses[expense.id]}
                    onChange={(e) => handleExpenseChange(expense.id, e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Recommended: ${expense.recommended}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className={remaining >= 0 ? "bg-green-50" : "bg-red-50"}>
            <CardHeader>
              <CardTitle>Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Total Income: ${income}</p>
                <p>Total Expenses: ${totalExpenses}</p>
                <p className={remaining >= 0 ? "text-green-600" : "text-red-600"}>
                  {remaining >= 0 ? "Savings" : "Deficit"}: ${Math.abs(remaining)}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              onClick={handleNextMonth}
              disabled={isGameComplete}
            >
              {isGameComplete ? "Game Complete!" : "Complete Month"}
            </Button>
          </div>
        </motion.div>

        <div className="md:col-span-1">
          <AchievementsPanel />
        </div>
      </div>
    </div>
  )
} 