"use client"

import { CurrencyConverter } from "@/components/ui/currency-converter"

export default function CurrencyConverterPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Currency Converter</h1>
        <p className="text-muted-foreground">
          Convert between different currencies using real-time exchange rates
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <CurrencyConverter />
      </div>
    </div>
  )
} 