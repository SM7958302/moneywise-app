"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useFriends } from "@/context/FriendsContext"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function FriendsPanel() {
  const { friends, pendingRequests, addFriend, acceptRequest, declineRequest, removeFriend, sendChallenge } = useFriends()
  const [friendId, setFriendId] = useState("")
  const [showAddFriend, setShowAddFriend] = useState(false)

  const handleAddFriend = () => {
    if (friendId) {
      addFriend(friendId)
      setFriendId("")
      setShowAddFriend(false)
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Friends</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowAddFriend(!showAddFriend)}
        >
          {showAddFriend ? "Cancel" : "Add Friend"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddFriend && (
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Enter friend ID"
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
            />
            <Button onClick={handleAddFriend}>Add</Button>
          </div>
        )}

        {pendingRequests.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Pending Requests</h3>
            {pendingRequests.map(friend => (
              <Card key={friend.id} className="p-3">
                <div className="flex items-center justify-between">
                  <span>{friend.name}</span>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => acceptRequest(friend.id)}
                    >
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => declineRequest(friend.id)}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <h3 className="font-semibold">Your Friends</h3>
          {friends.map(friend => (
            <Card key={friend.id} className="p-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{friend.name}</span>
                    <div className="text-sm text-muted-foreground">
                      Level {friend.level} • {friend.xp} XP
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => sendChallenge(friend.id, "budget-hero")}
                  >
                    Challenge
                  </Button>
                </div>
                <Progress value={friend.xp % 300 / 3} className="h-1" />
                <div className="flex flex-wrap gap-1">
                  {friend.achievements.map(achievement => (
                    <Badge key={achievement} variant="secondary">
                      {achievement.split("_").map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(" ")}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last active: {friend.lastActive}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 