"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Friend = {
  id: string
  name: string
  xp: number
  level: number
  achievements: string[]
  lastActive: string
}

type FriendsContextType = {
  friends: Friend[]
  pendingRequests: Friend[]
  addFriend: (friendId: string) => void
  acceptRequest: (friendId: string) => void
  declineRequest: (friendId: string) => void
  removeFriend: (friendId: string) => void
  sendChallenge: (friendId: string, gameId: string) => void
  getFriendProgress: (friendId: string) => Friend | undefined
}

const defaultFriends: Friend[] = [
  {
    id: "1",
    name: "Sarah Chen",
    xp: 850,
    level: 4,
    achievements: ["saving_star", "expense_master"],
    lastActive: "2024-03-24"
  },
  {
    id: "2",
    name: "Mike Johnson",
    xp: 620,
    level: 3,
    achievements: ["first_budget", "saving_star"],
    lastActive: "2024-03-23"
  }
]

const FriendsContext = createContext<FriendsContextType | null>(null)

export function FriendsProvider({ children }: { children: React.ReactNode }) {
  const [friends, setFriends] = useState<Friend[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("friends")
      return saved ? JSON.parse(saved) : defaultFriends
    }
    return defaultFriends
  })

  const [pendingRequests, setPendingRequests] = useState<Friend[]>([])

  useEffect(() => {
    localStorage.setItem("friends", JSON.stringify(friends))
  }, [friends])

  const addFriend = (friendId: string) => {
    // In a real app, this would make an API call
    const newFriend: Friend = {
      id: friendId,
      name: `Friend ${friendId}`,
      xp: 0,
      level: 1,
      achievements: [],
      lastActive: new Date().toISOString().split('T')[0]
    }
    setPendingRequests(prev => [...prev, newFriend])
  }

  const acceptRequest = (friendId: string) => {
    const friend = pendingRequests.find(f => f.id === friendId)
    if (friend) {
      setFriends(prev => [...prev, friend])
      setPendingRequests(prev => prev.filter(f => f.id !== friendId))
    }
  }

  const declineRequest = (friendId: string) => {
    setPendingRequests(prev => prev.filter(f => f.id !== friendId))
  }

  const removeFriend = (friendId: string) => {
    setFriends(prev => prev.filter(f => f.id !== friendId))
  }

  const sendChallenge = (friendId: string, gameId: string) => {
    // In a real app, this would send a notification to the friend
    console.log(`Challenge sent to ${friendId} for game ${gameId}`)
  }

  const getFriendProgress = (friendId: string) => {
    return friends.find(f => f.id === friendId)
  }

  return (
    <FriendsContext.Provider
      value={{
        friends,
        pendingRequests,
        addFriend,
        acceptRequest,
        declineRequest,
        removeFriend,
        sendChallenge,
        getFriendProgress
      }}
    >
      {children}
    </FriendsContext.Provider>
  )
}

export function useFriends() {
  const context = useContext(FriendsContext)
  if (!context) {
    throw new Error("useFriends must be used within a FriendsProvider")
  }
  return context
} 