"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface MiniGameProps {
  type: "budget_planner" | "stock_picker" | "savings_challenge"
  onComplete: (result: number) => void
  onSkip: () => void
}

interface GameProps {
  onComplete: (result: number) => void
  onSkip: () => void
}

export function BudgetPlannerGame({ onComplete, onSkip }: GameProps) {
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [items, setItems] = useState([
    { name: "Groceries", amount: 200, category: "essential" },
    { name: "Entertainment", amount: 150, category: "non-essential" },
    { name: "Utilities", amount: 300, category: "essential" },
    { name: "Shopping", amount: 100, category: "non-essential" },
    { name: "Transportation", amount: 250, category: "essential" },
  ])
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      onComplete(score)
    }
  }, [timeLeft, score, onComplete])

  const handleItemClick = (itemName: string) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(prev => prev.filter(item => item !== itemName))
      setScore(prev => prev - 10)
    } else {
      setSelectedItems(prev => [...prev, itemName])
      setScore(prev => prev + 10)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Planner Challenge</CardTitle>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Time Left: {timeLeft}s
          </div>
          <div className="text-sm text-muted-foreground">
            Score: {score}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Click on essential items to include them in your budget. Avoid non-essential items!
          </p>
          <div className="grid grid-cols-2 gap-4">
            {items.map(item => (
              <Button
                key={item.name}
                variant={selectedItems.includes(item.name) ? "default" : "outline"}
                className="h-auto py-4"
                onClick={() => handleItemClick(item.name)}
              >
                <div className="text-left">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ${item.amount} • {item.category}
                  </div>
                </div>
              </Button>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={onSkip}>
              Skip
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StockPickerGame({ onComplete, onSkip }: GameProps) {
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [stocks, setStocks] = useState([
    { name: "Tech Giant", price: 150, trend: "up" },
    { name: "Startup", price: 20, trend: "down" },
    { name: "Blue Chip", price: 80, trend: "up" },
    { name: "Penny Stock", price: 5, trend: "down" },
    { name: "Dividend Stock", price: 100, trend: "up" },
  ])
  const [selectedStocks, setSelectedStocks] = useState<string[]>([])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      onComplete(score)
    }
  }, [timeLeft, score, onComplete])

  const handleStockClick = (stockName: string) => {
    if (selectedStocks.includes(stockName)) {
      setSelectedStocks(prev => prev.filter(stock => stock !== stockName))
      setScore(prev => prev - 10)
    } else {
      setSelectedStocks(prev => [...prev, stockName])
      setScore(prev => prev + 10)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock Picker Challenge</CardTitle>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Time Left: {timeLeft}s
          </div>
          <div className="text-sm text-muted-foreground">
            Score: {score}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select stocks that you think will perform well. Consider price and trend!
          </p>
          <div className="grid grid-cols-2 gap-4">
            {stocks.map(stock => (
              <Button
                key={stock.name}
                variant={selectedStocks.includes(stock.name) ? "default" : "outline"}
                className="h-auto py-4"
                onClick={() => handleStockClick(stock.name)}
              >
                <div className="text-left">
                  <div className="font-medium">{stock.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ${stock.price} • {stock.trend === "up" ? "↑" : "↓"}
                  </div>
                </div>
              </Button>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={onSkip}>
              Skip
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SavingsChallengeGame({ onComplete, onSkip }: GameProps) {
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [expenses, setExpenses] = useState([
    { name: "Coffee", amount: 5, category: "daily" },
    { name: "Lunch", amount: 15, category: "daily" },
    { name: "Movie", amount: 20, category: "entertainment" },
    { name: "Shopping", amount: 50, category: "shopping" },
    { name: "Gym", amount: 30, category: "health" },
  ])
  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else {
      onComplete(score)
    }
  }, [timeLeft, score, onComplete])

  const handleExpenseClick = (expenseName: string) => {
    if (selectedExpenses.includes(expenseName)) {
      setSelectedExpenses(prev => prev.filter(expense => expense !== expenseName))
      setScore(prev => prev - 10)
    } else {
      setSelectedExpenses(prev => [...prev, expenseName])
      setScore(prev => prev + 10)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Challenge</CardTitle>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Time Left: {timeLeft}s
          </div>
          <div className="text-sm text-muted-foreground">
            Score: {score}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select expenses you can reduce or eliminate to save money!
          </p>
          <div className="grid grid-cols-2 gap-4">
            {expenses.map(expense => (
              <Button
                key={expense.name}
                variant={selectedExpenses.includes(expense.name) ? "default" : "outline"}
                className="h-auto py-4"
                onClick={() => handleExpenseClick(expense.name)}
              >
                <div className="text-left">
                  <div className="font-medium">{expense.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ${expense.amount} • {expense.category}
                  </div>
                </div>
              </Button>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={onSkip}>
              Skip
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function MiniGame({ type, onComplete, onSkip }: MiniGameProps) {
  switch (type) {
    case "budget_planner":
      return <BudgetPlannerGame onComplete={onComplete} onSkip={onSkip} />
    case "stock_picker":
      return <StockPickerGame onComplete={onComplete} onSkip={onSkip} />
    case "savings_challenge":
      return <SavingsChallengeGame onComplete={onComplete} onSkip={onSkip} />
    default:
      return null
  }
} 