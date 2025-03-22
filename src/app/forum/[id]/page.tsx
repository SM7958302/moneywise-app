"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useForum } from "@/contexts/ForumContext"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, MessageCircle } from "lucide-react"
import { ShareButton } from "@/components/ui/share-button"

export default function DiscussionPage() {
  const { id } = useParams()
  const { discussions, addComment, likeDiscussion, likeComment } = useForum()
  const [newComment, setNewComment] = useState("")
  const discussion = discussions.find((d) => d.id === id)

  if (!discussion) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">Discussion not found</h1>
      </div>
    )
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      addComment(discussion.id, newComment)
      setNewComment("")
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{discussion.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Posted by {discussion.author} •{" "}
                {new Date(discussion.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
              {discussion.category}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{discussion.content}</p>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => likeDiscussion(discussion.id)}
              className="flex items-center gap-1"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{discussion.likes}</span>
            </Button>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{discussion.comments.length}</span>
            </div>
            <ShareButton
              title={discussion.title}
              text={discussion.content}
              url={`${window.location.origin}/forum/${discussion.id}`}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold">Comments</h2>
        {discussion.comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-muted-foreground">
                  {comment.author} •{" "}
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => likeComment(discussion.id, comment.id)}
                  className="flex items-center gap-1"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{comment.likes}</span>
                </Button>
              </div>
              <p>{comment.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <Textarea
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <Button type="submit">Post Comment</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 