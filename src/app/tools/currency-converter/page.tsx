"use client"

import { Background } from "@/components/ui/background"
import { CurrencyConverter } from "@/components/ui/currency-converter"

export default function CurrencyConverterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Background />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Currency Converter</h1>
        <p className="text-gray-600 text-center mb-8">
          Convert between different currencies using real-time exchange rates
        </p>
        <CurrencyConverter />
      </div>
    </div>
  )
} 