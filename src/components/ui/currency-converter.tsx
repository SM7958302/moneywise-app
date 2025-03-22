"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "INR", name: "Indian Rupee" },
  { code: "NZD", name: "New Zealand Dollar" }
]

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [rates, setRates] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRates()
  }, [])

  const fetchRates = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
      const data = await response.json()
      setRates(data.rates)
    } catch (err) {
      setError("Failed to fetch exchange rates. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleAmountChange = (value: string) => {
    // Only allow positive numbers with up to 2 decimal places
    const sanitizedValue = value.replace(/[^0-9.]/g, "")
    if (sanitizedValue === "" || /^\d*\.?\d{0,2}$/.test(sanitizedValue)) {
      setAmount(sanitizedValue)
    }
  }

  const convertCurrency = () => {
    if (!amount || isNaN(Number(amount))) return 0

    const numericAmount = Number(amount)
    if (numericAmount <= 0 || !isFinite(numericAmount)) return 0

    const fromRate = rates[fromCurrency] || 1
    const toRate = rates[toCurrency] || 1
    const result = (numericAmount / fromRate) * toRate

    // Format the result with 2 decimal places and prevent scientific notation
    return result.toFixed(2)
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Currency Converter</h2>
      
      <div className="space-y-4">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <Input
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="Enter amount"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">From</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">To</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-4">
            <p className="text-gray-600">Loading exchange rates...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-4">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && amount && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Converted Amount:</p>
            <p className="text-2xl font-bold">
              {convertCurrency()} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
} 