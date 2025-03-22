"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const categories = [
  "Housing",
  "Transportation",
  "Food",
  "Utilities",
  "Healthcare",
  "Entertainment",
  "Shopping",
  "Savings"
]

export default function BudgetPlanner() {
  const [income, setIncome] = useState(5000)
  const [expenses, setExpenses] = useState<Record<string, number>>(
    Object.fromEntries(categories.map(cat => [cat, 0]))
  )

  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0)
  const remaining = income - totalExpenses

  const handleExpenseChange = (category: string, value: string) => {
    const numValue = parseInt(value) || 0
    setExpenses(prev => ({
      ...prev,
      [category]: numValue
    }))
  }

  const getRecommendation = () => {
    const housingPercent = (expenses.Housing / income) * 100
    const savingsPercent = (expenses.Savings / income) * 100
    
    let recommendations = []
    
    if (housingPercent > 30) {
      recommendations.push("Your housing costs are above 30% of your income. Consider finding ways to reduce this expense.")
    }
    
    if (savingsPercent < 20) {
      recommendations.push("Try to save at least 20% of your income for long-term financial security.")
    }
    
    if (remaining < 0) {
      recommendations.push("You're spending more than you earn. Review your expenses and find areas to cut back.")
    }
    
    return recommendations.length > 0 ? recommendations : ["Your budget looks healthy! Keep up the good work!"]
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Budget Planner</h1>
          <p className="text-muted-foreground">Plan and track your monthly expenses</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Income</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(parseInt(e.target.value) || 0)}
              className="w-full p-2 border rounded"
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(category => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="number"
                  value={expenses[category]}
                  onChange={(e) => handleExpenseChange(category, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className={remaining >= 0 ? "bg-green-50" : "bg-red-50"}>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Total Income: ${income}</p>
              <p>Total Expenses: ${totalExpenses}</p>
              <p className={remaining >= 0 ? "text-green-600" : "text-red-600"}>
                {remaining >= 0 ? "Remaining" : "Deficit"}: ${Math.abs(remaining)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 space-y-2">
              {getRecommendation().map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 