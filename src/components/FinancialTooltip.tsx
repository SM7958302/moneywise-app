import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

type FinancialTooltipProps = {
  term: string
  children: React.ReactNode
}

const financialTerms = {
  "savings": "Money set aside for future use or emergencies. It's important to save regularly to build financial security.",
  "debt": "Money owed to others, such as credit card balances, loans, or mortgages. High-interest debt should be paid off quickly.",
  "income": "Money received from work, investments, or other sources. Regular income helps maintain financial stability.",
  "budget": "A plan for managing money, including income and expenses. Budgeting helps track and control spending.",
  "investment": "Using money to buy assets that may increase in value or provide returns. Investments can help grow wealth over time.",
  "interest": "The cost of borrowing money (when paying) or the return on lending money (when earning). Interest rates affect both savings and debt.",
  "credit score": "A number that represents creditworthiness, based on credit history. A good credit score helps get better loan terms.",
  "emergency fund": "Money saved specifically for unexpected expenses or emergencies. Aim for 3-6 months of living expenses.",
  "compound interest": "Interest earned on both the initial amount and previously earned interest. This helps money grow faster over time.",
  "diversification": "Spreading investments across different types of assets to reduce risk. Don't put all eggs in one basket.",
  "portfolio": "A collection of investments owned by an individual. A balanced portfolio helps manage risk and potential returns.",
  "risk tolerance": "How much investment risk you're comfortable taking. Generally, higher risk may lead to higher potential returns.",
  "market volatility": "The rate at which investment prices change. More volatile investments tend to be riskier.",
  "asset allocation": "How investments are divided among different asset types. This affects risk and potential returns.",
  "dividend": "A portion of a company's earnings paid to shareholders. Dividends can provide regular income from investments."
}

export function FinancialTooltip({ term, children }: FinancialTooltipProps) {
  const explanation = financialTerms[term.toLowerCase() as keyof typeof financialTerms] || 
    "Term explanation not available. Please check our glossary for more information."

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-1 cursor-help">
            {children}
            <HelpCircle className="w-4 h-4 text-gray-400" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-3">
          <p className="text-sm">{explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 