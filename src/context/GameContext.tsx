"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { levels, type GameProgress, Scenario, scenarios } from "@/lib/game-data"

interface GameContextType {
  xp: number
  level: number
  xpToNextLevel: number
  addXP: (amount: number) => void
  unlockAchievement: (id: string) => void
  completeScenario: (id: string) => void
  progress: {
    completedScenarios: string[]
    unlockedAchievements: string[]
  }
  completedScenarios: Scenario[]
  scenarios: Scenario[]
  setCompletedScenarios: React.Dispatch<React.SetStateAction<Scenario[]>>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [xp, setXp] = useState(0)
  const [completedScenarios, setCompletedScenarios] = useState<Scenario[]>([])
  const [gameScenarios] = useState<Scenario[]>(scenarios)
  const level = Math.floor(xp / 1000) + 1
  const xpToNextLevel = level * 1000
  const [progress, setProgress] = useState({
    completedScenarios: [] as string[],
    unlockedAchievements: [] as string[],
  })

  useEffect(() => {
    const savedXP = localStorage.getItem('xp')
    const savedCompletedScenarios = localStorage.getItem('completedScenarios')
    if (savedXP) setXp(parseInt(savedXP))
    if (savedCompletedScenarios) setCompletedScenarios(JSON.parse(savedCompletedScenarios))
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "gameProgress",
      JSON.stringify({ level, xp, progress })
    )
  }, [level, xp, progress])

  const addXP = (amount: number) => {
    setXp(prev => {
      const newXP = prev + amount
      localStorage.setItem('xp', newXP.toString())
      return newXP
    })
  }

  const unlockAchievement = (id: string) => {
    setProgress((prev) => ({
      ...prev,
      unlockedAchievements: [...prev.unlockedAchievements, id],
    }))
  }

  const completeScenario = (id: string) => {
    setProgress((prev) => ({
      ...prev,
      completedScenarios: [...prev.completedScenarios, id],
    }))
  }

  return (
    <GameContext.Provider
      value={{
        xp,
        level,
        xpToNextLevel,
        addXP,
        unlockAchievement,
        completeScenario,
        progress,
        completedScenarios,
        scenarios: gameScenarios,
        setCompletedScenarios
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
} 