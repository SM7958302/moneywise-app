"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const tools = [
  {
    name: "Currency Converter",
    description: "Convert between different currencies using real-time exchange rates",
    href: "/tools/currency-converter",
    icon: "💱"
  }
]

export default function ToolsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Financial Tools</h1>
        <p className="text-muted-foreground">
          Useful tools to help you manage your finances
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{tool.icon}</span>
                {tool.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <Button asChild className="w-full">
                <Link href={tool.href}>Open Tool</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 