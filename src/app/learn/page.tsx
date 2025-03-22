"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const modules = [
  {
    id: "basics",
    title: "Financial Basics",
    modules: [
      {
        id: "understanding-money",
        title: "Understanding Money",
        description: "Learn about currency, banking, and basic financial concepts",
        progress: 0,
        lessons: [
          { id: "what-is-money", title: "What is Money?", completed: false },
          { id: "banking-101", title: "Banking 101", completed: false },
          { id: "saving-basics", title: "Saving Basics", completed: false }
        ]
      },
      {
        id: "budgeting",
        title: "Budgeting Fundamentals",
        description: "Master the art of creating and maintaining a budget",
        progress: 0,
        lessons: [
          { id: "creating-budget", title: "Creating a Budget", completed: false },
          { id: "income-expenses", title: "Income vs Expenses", completed: false },
          { id: "tracking-spending", title: "Tracking Spending", completed: false }
        ]
      }
    ]
  },
  {
    id: "intermediate",
    title: "Smart Saving",
    modules: [
      {
        id: "saving-strategies",
        title: "Saving Strategies",
        description: "Discover effective ways to save money and build wealth",
        progress: 0,
        lessons: [
          { id: "emergency-funds", title: "Emergency Funds", completed: false },
          { id: "saving-goals", title: "Saving Goals", completed: false },
          { id: "automated-saving", title: "Automated Saving", completed: false }
        ]
      },
      {
        id: "investment-basics",
        title: "Investment Basics",
        description: "Learn the fundamentals of investing and growing your money",
        progress: 0,
        lessons: [
          { id: "what-is-investing", title: "What is Investing?", completed: false },
          { id: "investment-types", title: "Types of Investments", completed: false },
          { id: "risk-management", title: "Risk Management", completed: false }
        ]
      }
    ]
  }
]

export default function LearnPage() {
  const [currentModules, setCurrentModules] = useState(modules)

  const completeLesson = (sectionId: string, moduleId: string, lessonId: string) => {
    setCurrentModules(prevModules => {
      return prevModules.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            modules: section.modules.map(module => {
              if (module.id === moduleId) {
                const updatedLessons = module.lessons.map(lesson => 
                  lesson.id === lessonId ? { ...lesson, completed: true } : lesson
                )
                const completedCount = updatedLessons.filter(l => l.completed).length
                const progress = Math.round((completedCount / updatedLessons.length) * 100)
                
                return {
                  ...module,
                  lessons: updatedLessons,
                  progress
                }
              }
              return module
            })
          }
        }
        return section
      })
    })
    toast.success("Lesson completed!")
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Learning Modules</h1>
        
        <Tabs defaultValue="basics" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            {currentModules.map((section) => (
              <TabsTrigger key={section.id} value={section.id}>
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {currentModules.map((section) => (
            <TabsContent key={section.id} value={section.id} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.modules.map((module) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <CardTitle>{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between text-sm"
                            >
                              <span>{lesson.title}</span>
                              <Button
                                variant={lesson.completed ? "secondary" : "outline"}
                                size="sm"
                                onClick={() => completeLesson(section.id, module.id, lesson.id)}
                                disabled={lesson.completed}
                              >
                                {lesson.completed ? "Completed" : "Start"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  )
} 