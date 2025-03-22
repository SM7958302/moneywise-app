"use client"

import { useState } from "react"
import { useForum } from "@/contexts/ForumContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, ThumbsUp } from "lucide-react"
import Link from "next/link"

export default function ForumPage() {
  const { discussions, addDiscussion, categories } = useForum()
  const [showNewDiscussion, setShowNewDiscussion] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title && content && category) {
      addDiscussion(title, content, category)
      setTitle("")
      setContent("")
      setCategory("")
      setShowNewDiscussion(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Financial Discussion Forum</h1>
        <Button onClick={() => setShowNewDiscussion(!showNewDiscussion)}>
          {showNewDiscussion ? "Cancel" : "New Discussion"}
        </Button>
      </div>

      {showNewDiscussion && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Discussion Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Textarea
                  placeholder="Discussion Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
              <Button type="submit">Post Discussion</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card key={discussion.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">
                    <Link
                      href={`/forum/${discussion.id}`}
                      className="hover:text-primary"
                    >
                      {discussion.title}
                    </Link>
                  </CardTitle>
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
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {discussion.content}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{discussion.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{discussion.comments.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 