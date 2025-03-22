"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Background } from "@/components/ui/background"
import Image from "next/image"

const games = [
  {
    id: "budget-hero",
    title: "Budget Hero",
    description: "Master budgeting skills by managing virtual finances",
    difficulty: "easy",
    color: "bg-green-500"
  },
  {
    id: "market-master",
    title: "Market Master",
    description: "Learn investment strategies through simulated trading",
    difficulty: "medium",
    color: "bg-blue-500"
  },
  {
    id: "savings-quest",
    title: "Savings Quest",
    description: "Complete challenges to build smart saving habits",
    difficulty: "easy",
    color: "bg-purple-500"
  }
]

const tools = [
  {
    name: "Currency Converter",
    description: "Convert between different currencies with real-time exchange rates",
    link: "/tools/currency-converter",
    icon: "/currency-exchange.svg"
  }
]

export default function HomePage() {
  const [greeting] = useState("Welcome to MoneyWise! Let's learn about finance together!")

  return (
    <div className="container mx-auto px-4 py-8">
      <Background />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to MoneyWise</h1>
        <p className="text-gray-600 text-center mb-8">
          Your personal finance learning platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link href="/games">
            <Card className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-t-lg" />
                <div className="relative">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/game-controller.svg"
                      alt="Games"
                      width={80}
                      height={80}
                      className="opacity-80"
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">Financial Games</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                Learn about money management through interactive games
              </CardContent>
            </Card>
          </Link>

          <Link href="/progress">
            <Card className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-t-lg" />
                <div className="relative">
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/progress-chart.svg"
                      alt="Progress"
                      width={80}
                      height={80}
                      className="opacity-80"
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold text-center">Track Progress</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                Monitor your learning journey and achievements
              </CardContent>
            </Card>
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">Financial Tools</h2>
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
