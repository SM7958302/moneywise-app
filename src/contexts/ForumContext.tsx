"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface Comment {
  id: string
  content: string
  author: string
  createdAt: string
  likes: number
  likedBy: string[]
}

interface Discussion {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  category: string
  likes: number
  likedBy: string[]
  comments: Comment[]
}

interface ForumContextType {
  discussions: Discussion[]
  addDiscussion: (title: string, content: string, category: string) => void
  addComment: (discussionId: string, content: string) => void
  likeDiscussion: (discussionId: string) => void
  likeComment: (discussionId: string, commentId: string) => void
  categories: string[]
}

const ForumContext = createContext<ForumContextType | undefined>(undefined)

export function ForumProvider({ children }: { children: React.ReactNode }) {
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const categories = [
    "Budgeting Tips",
    "Investment Strategies",
    "Saving Money",
    "Financial Goals",
    "General Discussion",
  ]

  useEffect(() => {
    const savedDiscussions = localStorage.getItem("discussions")
    if (savedDiscussions) {
      setDiscussions(JSON.parse(savedDiscussions))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("discussions", JSON.stringify(discussions))
  }, [discussions])

  const addDiscussion = (title: string, content: string, category: string) => {
    const newDiscussion: Discussion = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      author: localStorage.getItem("username") || "Anonymous",
      createdAt: new Date().toISOString(),
      category,
      likes: 0,
      likedBy: [],
      comments: [],
    }
    setDiscussions([newDiscussion, ...discussions])
  }

  const addComment = (discussionId: string, content: string) => {
    setDiscussions((prev) =>
      prev.map((discussion) => {
        if (discussion.id === discussionId) {
          const newComment: Comment = {
            id: Math.random().toString(36).substr(2, 9),
            content,
            author: localStorage.getItem("username") || "Anonymous",
            createdAt: new Date().toISOString(),
            likes: 0,
            likedBy: [],
          }
          return {
            ...discussion,
            comments: [...discussion.comments, newComment],
          }
        }
        return discussion
      })
    )
  }

  const likeDiscussion = (discussionId: string) => {
    const username = localStorage.getItem("username") || "Anonymous"
    setDiscussions((prev) =>
      prev.map((discussion) => {
        if (discussion.id === discussionId) {
          const hasLiked = discussion.likedBy.includes(username)
          return {
            ...discussion,
            likes: hasLiked ? discussion.likes - 1 : discussion.likes + 1,
            likedBy: hasLiked
              ? discussion.likedBy.filter((user) => user !== username)
              : [...discussion.likedBy, username],
          }
        }
        return discussion
      })
    )
  }

  const likeComment = (discussionId: string, commentId: string) => {
    const username = localStorage.getItem("username") || "Anonymous"
    setDiscussions((prev) =>
      prev.map((discussion) => {
        if (discussion.id === discussionId) {
          return {
            ...discussion,
            comments: discussion.comments.map((comment) => {
              if (comment.id === commentId) {
                const hasLiked = comment.likedBy.includes(username)
                return {
                  ...comment,
                  likes: hasLiked ? comment.likes - 1 : comment.likes + 1,
                  likedBy: hasLiked
                    ? comment.likedBy.filter((user) => user !== username)
                    : [...comment.likedBy, username],
                }
              }
              return comment
            }),
          }
        }
        return discussion
      })
    )
  }

  return (
    <ForumContext.Provider
      value={{
        discussions,
        addDiscussion,
        addComment,
        likeDiscussion,
        likeComment,
        categories,
      }}
    >
      {children}
    </ForumContext.Provider>
  )
}

export function useForum() {
  const context = useContext(ForumContext)
  if (context === undefined) {
    throw new Error("useForum must be used within a ForumProvider")
  }
  return context
} 