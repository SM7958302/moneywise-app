"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type CurrencyCode = "INR" | "USD" | "EUR" | "GBP"

type ExchangeRates = {
  [K in CurrencyCode]: {
    [L in Exclude<CurrencyCode, K>]: number
  }
}

export default function ToolsPage() {
  const [loanAmount, setLoanAmount] = useState(1000000) // 10 lakh INR
  const [interestRate, setInterestRate] = useState(10) // Default rate for India
  const [loanTerm, setLoanTerm] = useState(12)
  const [monthlyPayment, setMonthlyPayment] = useState(0)

  // Currency converter state
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("INR")
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("USD")
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)

  // Example exchange rates (you should use a real API in production)
  const exchangeRates: ExchangeRates = {
    INR: {
      USD: 0.012,
      EUR: 0.011,
      GBP: 0.0095
    },
    USD: {
      INR: 83.25,
      EUR: 0.92,
      GBP: 0.79
    },
    EUR: {
      INR: 90.50,
      USD: 1.09,
      GBP: 0.86
    },
    GBP: {
      INR: 105.20,
      USD: 1.27,
      EUR: 1.16
    }
  }

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12
    const payment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm))
    setMonthlyPayment(payment)
  }

  const handleConversion = () => {
    if (!amount || !fromCurrency || !toCurrency) return
    
    const rate = exchangeRates[fromCurrency][toCurrency as Exclude<CurrencyCode, typeof fromCurrency>]
    const result = parseFloat(amount) * rate
    setConvertedAmount(result)
  }

  const formatCurrency = (value: number, currency: string) => {
    if (currency === "INR") {
      return new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(value)
    }
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: currency 
    }).format(value)
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
                <Label>Loan Amount (INR)</Label>
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
                    max={10000000}
                    step={10000}
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
                    max={50}
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
                    Monthly Payment: {formatCurrency(monthlyPayment, 'INR')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Payment: {formatCurrency(monthlyPayment * loanTerm, 'INR')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Currency Converter */}
          <Card>
            <CardHeader>
              <CardTitle>Currency Converter</CardTitle>
              <CardDescription>
                Convert between different currencies using real-time exchange rates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From</Label>
                  <Select 
                    value={fromCurrency} 
                    onValueChange={(value: CurrencyCode) => setFromCurrency(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>To</Label>
                  <Select 
                    value={toCurrency} 
                    onValueChange={(value: CurrencyCode) => setToCurrency(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleConversion} className="w-full">
                Convert
              </Button>

              {convertedAmount !== null && (
                <div className="pt-4 text-center">
                  <p className="text-lg font-semibold">
                    {formatCurrency(parseFloat(amount), fromCurrency)} =
                  </p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(convertedAmount, toCurrency)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
} 