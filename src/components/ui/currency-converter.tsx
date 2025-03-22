"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, RefreshCw } from "lucide-react"
import Image from 'next/image'

const currencies = [
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" }
]

export function CurrencyConverter() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("INR")
  const [toCurrency, setToCurrency] = useState("USD")
  const [rates, setRates] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchRates = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/INR")
      const data = await response.json()
      setRates(data.rates)
    } catch (err) {
      setError("Failed to fetch exchange rates. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()
  }, [])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow positive numbers with up to 2 decimal places
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setAmount(value)
    }
  }

  const convertCurrency = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return 0
    const fromRate = rates[fromCurrency] || 1
    const toRate = rates[toCurrency] || 1
    const result = (Number(amount) * toRate) / fromRate
    return result.toFixed(2)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-t-lg" />
        <div className="relative">
          <CardTitle className="text-2xl font-bold text-center mb-2">Currency Converter</CardTitle>
          <div className="flex justify-center">
            <Image
              src="/currency-exchange.svg"
              alt="Currency Exchange"
              width={100}
              height={100}
              className="opacity-80"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <div className="text-center py-4">
            <div className="text-2xl font-bold text-blue-600">
              {currencies.find(c => c.code === toCurrency)?.symbol}
              {convertCurrency()}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {amount} {currencies.find(c => c.code === fromCurrency)?.code} =
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Button
            onClick={fetchRates}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Rates
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 