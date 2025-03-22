"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CompoundCalculator() {
  const [principal, setPrincipal] = useState(1000)
  const [rate, setRate] = useState(5)
  const [time, setTime] = useState(5)
  const [monthlyContribution, setMonthlyContribution] = useState(100)

  const calculateCompoundInterest = () => {
    let total = principal
    const monthlyRate = rate / 100 / 12
    const months = time * 12

    for (let i = 0; i < months; i++) {
      total = total * (1 + monthlyRate) + monthlyContribution
    }

    return total.toFixed(2)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Compound Interest Calculator</h1>
          <p className="text-muted-foreground">See how your money grows over time!</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Initial Investment ($)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Annual Interest Rate (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time Period (Years)</label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Monthly Contribution ($)</label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              Future Value: ${calculateCompoundInterest()}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 