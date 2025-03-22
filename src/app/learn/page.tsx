"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const modules = [
  {
    id: "basics",
    title: "Financial Basics",
    modules: [
      {
        title: "Understanding Money",
        description: "Learn about currency, banking, and basic financial concepts",
        progress: 0,
        lessons: ["What is Money?", "Banking 101", "Saving Basics"]
      },
      {
        title: "Budgeting Fundamentals",
        description: "Master the art of creating and maintaining a budget",
        progress: 0,
        lessons: ["Creating a Budget", "Income vs Expenses", "Tracking Spending"]
      }
    ]
  },
  {
    id: "intermediate",
    title: "Smart Saving",
    modules: [
      {
        title: "Saving Strategies",
        description: "Discover effective ways to save money and build wealth",
        progress: 0,
        lessons: ["Emergency Funds", "Saving Goals", "Automated Saving"]
      },
      {
        title: "Investment Basics",
        description: "Learn the fundamentals of investing and growing your money",
        progress: 0,
        lessons: ["What is Investing?", "Types of Investments", "Risk Management"]
      }
    ]
  }
]

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Learning Modules</h1>
        
        <Tabs defaultValue="basics" className="space-y-8">
          <TabsList>
            {modules.map((section) => (
              <TabsTrigger key={section.id} value={section.id}>
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {modules.map((section) => (
            <TabsContent key={section.id} value={section.id} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.modules.map((module, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle>{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Progress value={module.progress} className="h-2" />
                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIdx) => (
                            <div
                              key={lessonIdx}
                              className="flex items-center justify-between text-sm"
                            >
                              <span>{lesson}</span>
                              <span className="text-muted-foreground">
                                {module.progress === 100 ? "Completed" : "Not started"}
                              </span>
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