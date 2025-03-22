"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function ToolsPage() {
  const [loanAmount, setLoanAmount] = useState(10000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(12)
  const [monthlyPayment, setMonthlyPayment] = useState(0)

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12
    const payment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm))
    setMonthlyPayment(payment)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Financial Tools</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loan Calculator */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Calculator</CardTitle>
              <CardDescription>
                Calculate your monthly loan payments based on amount, interest rate, and term.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Loan Amount</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    min={0}
                  />
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    max={100000}
                    step={1000}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Interest Rate (%)</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    min={0}
                    max={100}
                    step={0.1}
                  />
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    max={20}
                    step={0.1}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Loan Term (months)</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    min={1}
                  />
                  <Slider
                    value={[loanTerm]}
                    onValueChange={(value) => setLoanTerm(value[0])}
                    max={360}
                    step={1}
                  />
                </div>
              </div>

              <Button onClick={calculateLoan} className="w-full">
                Calculate
              </Button>

              {monthlyPayment > 0 && (
                <div className="pt-4 text-center">
                  <p className="text-lg font-semibold">
                    Monthly Payment: ${monthlyPayment.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Payment: ${(monthlyPayment * loanTerm).toFixed(2)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Savings Calculator */}
          <Card>
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                More financial tools are being developed, including:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Savings Calculator</li>
                  <li>Investment Returns Calculator</li>
                  <li>Budget Planner</li>
                  <li>Debt Payoff Calculator</li>
                </ul>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </main>
  )
} 