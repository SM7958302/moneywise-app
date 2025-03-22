"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"

const games = {
  "budget-hero": {
    title: "Budget Hero",
    description: "Master your budgeting skills by managing virtual finances. Make smart decisions about income and expenses to achieve financial goals.",
    instructions: "1. Set your monthly budget\n2. Allocate funds to different categories\n3. Handle unexpected expenses\n4. Try to save and invest wisely",
    color: "bg-green-500"
  },
  "market-master": {
    title: "Market Master",
    description: "Learn investment strategies through simulated trading. Experience the ups and downs of the market without real risk.",
    instructions: "1. Start with virtual money\n2. Research different stocks\n3. Make investment decisions\n4. Track your portfolio performance",
    color: "bg-blue-500"
  },
  "savings-quest": {
    title: "Savings Quest",
    description: "Complete challenges to build smart saving habits. Learn the importance of emergency funds and long-term savings.",
    instructions: "1. Choose your savings goal\n2. Complete daily challenges\n3. Avoid spending temptations\n4. Track your progress",
    color: "bg-purple-500"
  }
}

export default function GamePage() {
  const params = useParams()
  const gameId = params.id as string
  const game = games[gameId as keyof typeof games]

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Game Not Found</h1>
          <p className="text-muted-foreground">This game doesn't exist yet.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className={`w-full h-48 rounded-lg ${game.color} mb-8`} />
          
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-foreground">{game.title}</h1>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Games
              </Link>
            </div>

            <div className="prose prose-lg dark:prose-invert">
              <p>{game.description}</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">How to Play</h2>
              <div className="space-y-2">
                {game.instructions.split('\n').map((instruction, index) => (
                  <p key={index} className="flex items-start">
                    <span className="text-muted-foreground mr-2">{instruction}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button
                className="px-8 py-4 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                onClick={() => alert('Game coming soon!')}
              >
                Start Game
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 