import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { GamesList } from "./games-list"

export default async function GamesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect("/login")
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
        <GamesList 
          gameProgress={gameProgress}
          completedModuleIds={completedModuleIds}
        />
      </div>
    </div>
  )
} 