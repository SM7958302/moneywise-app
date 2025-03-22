import { Card } from './ui/card'
import { FinancialTooltip } from './FinancialTooltip'
import { Trophy, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react'

type Impact = {
  savings?: number
  debt?: number
  income?: number
  health?: number
  happiness?: number
  discipline?: number
  risk: number
  xp: number
}

type DetailedFeedbackProps = {
  feedback: string
  impact: Impact
  isCorrect: boolean
}

export function DetailedFeedback({ feedback, impact, isCorrect }: DetailedFeedbackProps) {
  const getImpactColor = (value: number | undefined) => {
    if (value === undefined) return 'text-gray-500'
    return value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : 'text-gray-500'
  }

  const getImpactIcon = (value: number | undefined) => {
    if (value === undefined) return null
    return value > 0 ? <TrendingUp className="w-4 h-4" /> : value < 0 ? <TrendingDown className="w-4 h-4" /> : null
  }

  const formatValue = (value: number | undefined) => {
    if (value === undefined) return 'No change'
    return value > 0 ? `+${value}` : value.toString()
  }

  return (
    <Card className={`p-4 space-y-4 border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-yellow-500'}`}>
      <div className="flex items-start gap-2">
        {isCorrect ? (
          <Trophy className="w-5 h-5 text-green-500 mt-1" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1" />
        )}
        <div>
          <h4 className="font-semibold">
            {isCorrect ? 'Great choice!' : 'Learning opportunity'}
          </h4>
          <p className="text-sm text-gray-600">{feedback}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(impact).map(([key, value]) => (
          key !== 'xp' && (
            <div key={key} className="flex items-center gap-2">
              <FinancialTooltip term={key}>
                <span className="capitalize text-sm">{key}:</span>
              </FinancialTooltip>
              <span className={`flex items-center gap-1 ${getImpactColor(value)}`}>
                {getImpactIcon(value)}
                {formatValue(value)}
              </span>
            </div>
          )
        ))}
      </div>

      <div className="flex items-center gap-2 border-t pt-2">
        <Trophy className="w-4 h-4 text-yellow-500" />
        <span className="text-sm">XP Earned: +{impact.xp}</span>
      </div>
    </Card>
  )
} 