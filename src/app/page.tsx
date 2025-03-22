import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const features = [
  {
    title: "Interactive Learning",
    description: "Learn financial concepts through engaging interactive modules and real-world scenarios.",
    href: "/learn"
  },
  {
    title: "Financial Games",
    description: "Play fun games that teach budgeting, investing, and money management skills.",
    href: "/games"
  },
  {
    title: "Smart Tools",
    description: "Use AI-powered calculators and tools to make informed financial decisions.",
    href: "/tools"
  },
  {
    title: "Track Progress",
    description: "Monitor your learning journey and earn rewards as you master new skills.",
    href: "/progress"
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="container px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Master Your Money, <br />
            Shape Your Future
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Learn essential financial skills through interactive games and AI-guided lessons.
            Start your journey to financial independence today.
          </p>
          <div className="flex gap-4 mt-8">
            <Button size="lg" asChild>
              <Link href="/learn">Start Learning</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/games">Play Games</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container px-4 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose FinWise?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href={feature.href}>Learn More →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
