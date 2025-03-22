"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface Post {
  id: string
  title: string
  content: string
  author: string
  createdAt: Date
  likes: number
  comments: Comment[]
}

interface Comment {
  id: string
  content: string
  author: string
  createdAt: Date
  likes: number
}

interface ForumContextType {
  posts: Post[]
  addPost: (title: string, content: string, author: string) => void
  addComment: (postId: string, content: string, author: string) => void
  likePost: (postId: string) => void
  likeComment: (postId: string, commentId: string) => void
}

const ForumContext = createContext<ForumContextType | undefined>(undefined)

export function ForumProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([])

  const addPost = (title: string, content: string, author: string) => {
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      author,
      createdAt: new Date(),
      likes: 0,
      comments: []
    }
    setPosts(prev => [...prev, newPost])
  }

  const addComment = (postId: string, content: string, author: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Math.random().toString(36).substr(2, 9),
          content,
          author,
          createdAt: new Date(),
          likes: 0
        }
        return { ...post, comments: [...post.comments, newComment] }
      }
      return post
    }))
  }

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 }
      }
      return post
    }))
  }

  const likeComment = (postId: string, commentId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, likes: comment.likes + 1 }
            }
            return comment
          })
        }
      }
      return post
    }))
  }

  return (
    <ForumContext.Provider value={{ posts, addPost, addComment, likePost, likeComment }}>
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