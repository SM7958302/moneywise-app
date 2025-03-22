import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BudgetItem {
  id: string
  category: string
  amount: number
  isNecessity: boolean
  description: string
}

const MONTHLY_INCOME = 5000
const INITIAL_BUDGET: BudgetItem[] = [
  {
    id: "rent",
    category: "Housing",
    amount: 1500,
    isNecessity: true,
    description: "Monthly rent payment"
  },
  {
    id: "utilities",
    category: "Utilities",
    amount: 200,
    isNecessity: true,
    description: "Electricity, water, and gas"
  },
  {
    id: "groceries",
    category: "Food",
    amount: 400,
    isNecessity: true,
    description: "Monthly groceries"
  },
  {
    id: "entertainment",
    category: "Entertainment",
    amount: 200,
    isNecessity: false,
    description: "Movies, games, and fun activities"
  },
  {
    id: "shopping",
    category: "Shopping",
    amount: 300,
    isNecessity: false,
    description: "Clothes and personal items"
  },
  {
    id: "dining",
    category: "Food",
    amount: 300,
    isNecessity: false,
    description: "Eating out at restaurants"
  }
]

export default async function BudgetHeroGame() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect("/login")
  }

  // Get game progress
  const progress = await prisma.gameProgress.findUnique({
    where: {
      userId_gameId: {
        userId: session.user.id,
        gameId: "budget-hero"
      }
    }
  })

  const necessities = INITIAL_BUDGET.filter(item => item.isNecessity)
  const discretionary = INITIAL_BUDGET.filter(item => !item.isNecessity)
  const totalNecessities = necessities.reduce((sum, item) => sum + item.amount, 0)
  const totalDiscretionary = discretionary.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = totalNecessities + totalDiscretionary
  const savings = MONTHLY_INCOME - totalExpenses

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-foreground">Budget Hero</h1>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Monthly Income</div>
              <div className="text-2xl font-bold text-foreground">${MONTHLY_INCOME}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 border shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Necessities</h2>
              <div className="space-y-4">
                {necessities.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-foreground">{item.category}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <div className="font-medium text-foreground">${item.amount}</div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center font-bold text-foreground">
                    <div>Total Necessities</div>
                    <div>${totalNecessities}</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Discretionary Spending</h2>
              <div className="space-y-4">
                {discretionary.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-foreground">{item.category}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <div className="font-medium text-foreground">${item.amount}</div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center font-bold text-foreground">
                    <div>Total Discretionary</div>
                    <div>${totalDiscretionary}</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-foreground">Monthly Income</div>
                <div className="font-medium text-foreground">${MONTHLY_INCOME}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-foreground">Total Expenses</div>
                <div className="font-medium text-foreground">${totalExpenses}</div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center font-bold">
                  <div className="text-foreground">Potential Savings</div>
                  <div className={savings >= 0 ? "text-green-600" : "text-red-600"}>
                    ${savings}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-8 flex justify-end space-x-4">
            <Button variant="outline" className="hover:bg-accent">Reset Budget</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  )
} 