"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { levels, type GameProgress } from "@/lib/game-data"

type GameContextType = {
  progress: GameProgress
  addXP: (amount: number) => void
  unlockAchievement: (id: string) => void
  completeLesson: (id: string) => void
  completeScenario: (id: string) => void
  getCurrentLevel: () => { title: string; progress: number }
}

const defaultProgress: GameProgress = {
  level: 1,
  xp: 0,
  achievements: [],
  completedLessons: [],
  completedScenarios: []
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<GameProgress>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gameProgress")
      return saved ? JSON.parse(saved) : defaultProgress
    }
    return defaultProgress
  })

  useEffect(() => {
    localStorage.setItem("gameProgress", JSON.stringify(progress))
  }, [progress])

  const addXP = (amount: number) => {
    setProgress(prev => {
      const newXP = prev.xp + amount
      let newLevel = prev.level

      // Check if player should level up
      while (newLevel < levels.length && newXP >= levels[newLevel].xpNeeded) {
        newLevel++
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel
      }
    })
  }

  const unlockAchievement = (id: string) => {
    if (!progress.achievements.includes(id)) {
      setProgress(prev => ({
        ...prev,
        achievements: [...prev.achievements, id]
      }))
    }
  }

  const completeLesson = (id: string) => {
    if (!progress.completedLessons.includes(id)) {
      setProgress(prev => ({
        ...prev,
        completedLessons: [...prev.completedLessons, id]
      }))
    }
  }

  const completeScenario = (id: string) => {
    if (!progress.completedScenarios.includes(id)) {
      setProgress(prev => ({
        ...prev,
        completedScenarios: [...prev.completedScenarios, id]
      }))
    }
  }

  const getCurrentLevel = () => {
    const currentLevel = levels[progress.level - 1]
    const nextLevel = levels[progress.level]
    const xpForCurrentLevel = progress.xp - currentLevel.xpNeeded
    const xpNeededForNextLevel = nextLevel ? nextLevel.xpNeeded - currentLevel.xpNeeded : 0
    const progress = xpNeededForNextLevel ? (xpForCurrentLevel / xpNeededForNextLevel) * 100 : 100

    return {
      title: currentLevel.title,
      progress
    }
  }

  return (
    <GameContext.Provider
      value={{
        progress,
        addXP,
        unlockAchievement,
        completeLesson,
        completeScenario,
        getCurrentLevel
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
} 