"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { levels, type GameProgress } from "@/lib/game-data"

interface GameContextType {
  level: number
  xp: number
  xpToNextLevel: number
  addXP: (amount: number) => void
  unlockAchievement: (id: string) => void
  completeScenario: (id: string) => void
  progress: {
    completedScenarios: string[]
    unlockedAchievements: string[]
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [progress, setProgress] = useState({
    completedScenarios: [] as string[],
    unlockedAchievements: [] as string[],
  })

  const xpToNextLevel = level * 1000

  useEffect(() => {
    const savedData = localStorage.getItem("gameProgress")
    if (savedData) {
      const { level: savedLevel, xp: savedXp, progress: savedProgress } = JSON.parse(savedData)
      setLevel(savedLevel)
      setXp(savedXp)
      setProgress(savedProgress)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "gameProgress",
      JSON.stringify({ level, xp, progress })
    )
  }, [level, xp, progress])

  const addXP = (amount: number) => {
    setXp((prev) => {
      const newXp = prev + amount
      if (newXp >= xpToNextLevel) {
        setLevel((prevLevel) => prevLevel + 1)
        return newXp - xpToNextLevel
      }
      return newXp
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
        level,
        xp,
        xpToNextLevel,
        addXP,
        unlockAchievement,
        completeScenario,
        progress,
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