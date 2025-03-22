"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Background } from "@/components/ui/background"
import Image from "next/image"

const tools = [
  {
    name: "Currency Converter",
    description: "Convert between different currencies with real-time exchange rates",
    link: "/tools/currency-converter",
    icon: "/currency-exchange.svg"
  }
]

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Background />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Financial Tools</h1>
        <p className="text-gray-600 text-center mb-8">
          Access helpful financial tools to manage your money better
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link key={tool.name} href={tool.link}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-t-lg" />
                  <div className="relative">
                    <div className="flex justify-center mb-4">
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        width={80}
                        height={80}
                        className="opacity-80"
                      />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">{tool.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  {tool.description}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 