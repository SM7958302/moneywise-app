import { useEffect, useState } from 'react'
import { Card } from './ui/card'
import { Progress } from './ui/progress'
import { Trophy, Calendar, Flame } from 'lucide-react'
import { Button } from './ui/button'

export function StreakTracker() {
  const [streak, setStreak] = useState(0)
  const [lastLogin, setLastLogin] = useState<string | null>(null)
  const [todayCompleted, setTodayCompleted] = useState(false)

  useEffect(() => {
    // Load streak data from localStorage
    const savedStreak = localStorage.getItem('streak')
    const savedLastLogin = localStorage.getItem('lastLogin')
    const savedTodayCompleted = localStorage.getItem('todayCompleted')

    if (savedStreak) setStreak(parseInt(savedStreak))
    if (savedLastLogin) setLastLogin(savedLastLogin)
    if (savedTodayCompleted) setTodayCompleted(savedTodayCompleted === 'true')

    // Check if streak should be reset or incremented
    const today = new Date().toDateString()
    if (savedLastLogin) {
      const lastLoginDate = new Date(savedLastLogin)
      const daysSinceLastLogin = Math.floor((new Date().getTime() - lastLoginDate.getTime()) / (1000 * 3600 * 24))

      if (daysSinceLastLogin > 1) {
        // Reset streak if more than 1 day has passed
        setStreak(0)
        setTodayCompleted(false)
      } else if (daysSinceLastLogin === 1 && !todayCompleted) {
        // New day, reset todayCompleted
        setTodayCompleted(false)
      }
    }

    // Update last login
    localStorage.setItem('lastLogin', today)
  }, [])

  // Update localStorage whenever streak changes
  useEffect(() => {
    localStorage.setItem('streak', streak.toString())
  }, [streak])

  // Update localStorage whenever todayCompleted changes
  useEffect(() => {
    localStorage.setItem('todayCompleted', todayCompleted.toString())
  }, [todayCompleted])

  const completeToday = () => {
    if (!todayCompleted) {
      setStreak(prev => prev + 1)
      setTodayCompleted(true)
    }
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-orange-500" />
          <h3 className="text-lg font-semibold">Learning Streak</h3>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-500">
            {lastLogin ? new Date(lastLogin).toLocaleDateString() : 'Start today!'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Progress value={todayCompleted ? 100 : 0} />
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-xl font-bold">{streak}</span>
          <span className="text-sm text-gray-500">days</span>
        </div>
      </div>

      {!todayCompleted && (
        <Button 
          onClick={completeToday} 
          className="w-full"
          variant="outline"
        >
          Complete Today's Learning
        </Button>
      )}
    </Card>
  )
} 