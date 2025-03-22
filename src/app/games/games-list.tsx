"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { games } from "@/lib/games"

interface GameProgress {
  gameId: string
  progress: number
  completed: boolean
}

interface GamesListProps {
  gameProgress: GameProgress[]
  completedModuleIds: string[]
}

export function GamesList({ gameProgress, completedModuleIds }: GamesListProps) {
  return (
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
  )
} 