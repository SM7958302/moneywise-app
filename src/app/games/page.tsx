"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { games } from "@/lib/games"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default async function GamesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Games</h1>
        <p className="text-muted-foreground mb-4">Please sign in to play games</p>
        <Link 
          href="/login"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Sign In
        </Link>
      </div>
    )
  }

  // Get user's progress for all games
  const gameProgress = await prisma.gameProgress.findMany({
    where: {
      userId: session.user.id
    }
  })

  // Get user's completed modules
  const completedModules = await prisma.progress.findMany({
    where: {
      userId: session.user.id,
      completed: true
    },
    select: {
      moduleId: true
    }
  })

  const completedModuleIds = completedModules.map(p => p.moduleId)

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Financial Games</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => {
            const progress = gameProgress.find(p => p.gameId === game.id)
            const canPlay = game.requiredModules.every(moduleId => 
              completedModuleIds.includes(moduleId)
            )
            
            return (
              <Card key={game.id} className="p-6 flex flex-col border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-foreground">{game.title}</h2>
                  <Badge variant={game.difficulty === 'easy' ? 'default' : 
                               game.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                    {game.difficulty}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4 flex-grow">{game.description}</p>
                <div className="space-y-4">
                  {progress && (
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${progress.progress}%` }}
                      />
                    </div>
                  )}
                  {!canPlay ? (
                    <div className="text-sm text-muted-foreground">
                      Complete {game.requiredModules.join(", ")} module(s) to unlock
                    </div>
                  ) : (
                    <Link
                      href={`/games/${game.id}`}
                      className={`w-full inline-flex justify-center items-center px-4 py-2 rounded-md transition-colors
                        ${progress?.completed 
                          ? 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                          : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                        }`}
                    >
                      {progress?.completed ? 'Play Again' : 'Start Game'}
                    </Link>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
} 